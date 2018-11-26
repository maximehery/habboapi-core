import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { BackupService } from '@habboapi/common';
import { ChatlogPrivateEntity } from '../entities/chatlogPrivate.entity';

import { ISearchOptions } from '@habboapi/common';
import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';

@Injectable()
export class ChatlogPrivateService
{
    constructor(
        private readonly backupService: BackupService,
        @InjectRepository(ChatlogPrivateEntity)
        private readonly chatlogPrivateRepository: Repository<ChatlogPrivateEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IChatlogPrivateList>
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
                    const columnMetadata = this.chatlogPrivateRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.chatlogPrivateRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.chatlogPrivateRepository.findAndCount({
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

    async getOne(chatlogId: number, relations?: Array<string>): Promise<IChatlogPrivate>
    {
        if(!chatlogId) throw new Error(`invalidParameters`);

        return await this.chatlogPrivateRepository.findOne({
            where: { id: chatlogId },
            relations: relations
        });
    }

    async delete(chatlogId: number): Promise<boolean>
    {
        if(!chatlogId) throw new Error(`invalidParameters`);

        await this.chatlogPrivateRepository.delete({ id: chatlogId });

        return true;
    }

    async backupAndTruncate(): Promise<boolean>
    {
        await this.backupService.backupMysql('chatlogs_private');

        await this.chatlogPrivateRepository.clear();

        return true;
    }
}