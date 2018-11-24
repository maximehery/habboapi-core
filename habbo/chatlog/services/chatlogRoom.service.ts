import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { BackupService } from '@habboapi/common';
import { ChatlogRoomEntity } from '../entities/chatlogRoom.entity';

import { ISearchOptions } from '@habboapi/common';
import { IChatlogRoom, IChatlogRoomList } from '../interfaces';

@Injectable()
export class ChatlogRoomService
{
    constructor(
        private readonly backupService: BackupService,
        @InjectRepository(ChatlogRoomEntity)
        private readonly chatlogRoomRepository: Repository<ChatlogRoomEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IChatlogRoomList>
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
                    const columnMetadata = this.chatlogRoomRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.chatlogRoomRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.chatlogRoomRepository.findAndCount({
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

    async getOne(chatlogId: number, relations?: Array<string>): Promise<IChatlogRoom>
    {
        if(!chatlogId) throw new Error(`invalidParameters`);

        return await this.chatlogRoomRepository.findOne({
            where: { id: chatlogId },
            relations: relations
        });
    }

    async delete(chatlogId: number): Promise<boolean>
    {
        if(!chatlogId) throw new Error(`invalidParameters`);

        await this.chatlogRoomRepository.delete({ id: chatlogId });

        return true;
    }

    async backupAndTruncate(): Promise<boolean>
    {
        await this.backupService.backupMysql('chatlogs_room');

        await this.chatlogRoomRepository.clear();

        return true;
    }
}