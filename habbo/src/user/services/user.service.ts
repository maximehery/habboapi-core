import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { UserValidatorService } from './userValidator.service';

import { UserEntity } from '../entities/user.entity';

import { ISearchOptions } from '@habboapi/common';
import { IUser, IUserList } from '../interfaces';

@Injectable()
export class UserService
{
    constructor(
        private readonly userValidatorService: UserValidatorService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IUserList>
    {
        const search: ISearchOptions = {
            where:      searchOptions.where || null,
            order:      searchOptions.order || null,
            limit:      searchOptions.limit && searchOptions.limit >= 20 ? +searchOptions.limit : 20,
            page:       +searchOptions.page || 1,
            relations:  searchOptions.relations
        };

        let searchWhereOptions = {};
        let searchOrderOptions = {};

        if(search.where && search.where.length >= 1)
        {
            search.where.forEach(where =>
            {
                if(where.column && where.operator && where.value)
                {
                    const columnMetadata = this.userRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidSearchColumn: ${where.column}`);

                    if(where.operator == 'equals') return searchWhereOptions[columnMetadata.propertyName]       = Equal(where.value);
                    else if(where.operator == 'like') return searchWhereOptions[columnMetadata.propertyName]    = Like(`%${where.value}%`);
                    else throw new Error(`invalidSearchOperator: ${where.operator}`);
                }

                throw new Error(`invalidSearch: ${where.column}:${where.operator}:${where.value}`);
            });
        }

        if(search.order && search.order.length >= 1)
        {
            search.order.forEach(order =>
            {
                if(order.column && order.sort)
                {
                    const columnMetadata = this.userRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.userRepository.findAndCount({
            where: searchWhereOptions,
            order: searchOrderOptions,
            take: search.limit,
            skip: (search.page - 1) * search.limit,
            relations: search.relations
        });

        let nextPage        = search.page + 1;
        let previousPage    = search.page - 1;
        let totalPages      = Math.ceil(+result[1] / search.limit);
        let totalItems      = +result[1];

        return {
            items: result[0],
            pagination: {
                currentPage: search.page,
                nextPage: nextPage > totalPages ? search.page > totalPages ? 1 : search.page : nextPage,
                previousPage: previousPage > totalPages ? 1 : previousPage || 1,
                totalPages: totalPages,
                totalItems: totalItems
            }
        };
    }

    async getOne(itemId: number, relations?: Array<string>): Promise<IUser>
    {
        if(!itemId) throw new Error(`invalidParameters`);

        return await this.userRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async login(username: string): Promise<{ id: number; username: string; password: string; look: string; rank: number; }>
    {
        if(!username) throw new Error(`invalidParameters`);
        
        return await this.userRepository.findOne({
            select: ['id', 'username', 'password', 'look', 'rank'],
            where: { username: username }
        });
    }
}