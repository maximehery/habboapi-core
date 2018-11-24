import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { ItemEntity } from '../entities/item.entity';

import { ISearchOptions } from '@habboapi/common';
import { IItem, IItemList } from '../interfaces';

@Injectable()
export class ItemService
{
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IItemList>
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
                    const columnMetadata = this.itemRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.itemRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.itemRepository.findAndCount({
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

    async getOne(itemId: number, relations?: Array<string>): Promise<IItem>
    {
        if(!itemId) throw new Error(`invalidParameters`);

        return await this.itemRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async put(item: IItem): Promise<IItem>
    {
        if(!item) throw new Error(`invalidParameters`);

        const add: IItem = {
            id: null,
            userId: item.userId || 0,
            roomId: item.roomId || 0,
            itemId: item.itemId || 0,
            wallPos: item.wallPos || 0,
            x: item.x || 0,
            y: item.y || 0,
            z: item.z || 0,
            rot: item.rot || 0,
            extraData: item.extraData || '',
            wiredData: item.wiredData || '',
            limitedData: item.limitedData || '0:0',
            groupId: item.groupId || 0
        };

        if(!add.userId || !add.itemId) throw new Error(`invalidItem`);

        return await this.itemRepository.save(add);
    }

    async patch(itemId: number, item: IItem): Promise<IItem>
    {
        if(!itemId || !item) throw new Error(`invalidParameters`);

        const result = await this.itemRepository.findOne(itemId);

        if(!result) throw new Error(`invalidItem`);

        const update: IItem = {
            id: +itemId,
            userId: item.userId || result.userId,
            roomId: item.roomId || result.roomId,
            itemId: item.itemId || result.itemId,
            wallPos: item.wallPos || result.wallPos,
            x: item.x || result.x,
            y: item.y || result.y,
            z: item.z || result.z,
            rot: item.rot || result.rot,
            extraData: item.extraData || result.extraData,
            wiredData: item.wiredData || result.wiredData,
            limitedData: item.limitedData || result.limitedData,
            groupId: item.groupId || result.groupId
        };

        if(!update.userId || !update.itemId) throw new Error(`invalidItem`);

        await this.itemRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: itemId })
            .execute();

        return update;
    }

    async delete(itemId: number): Promise<boolean>
    {
        if(!itemId) throw new Error(`invalidParameters`);

        await this.itemRepository.delete({ id: itemId });

        return true;
    }
}