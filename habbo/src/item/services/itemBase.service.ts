import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { ItemEntity } from '../entities/item.entity';
import { ItemBaseEntity } from '../entities/itemBase.entity';

import { ISearchOptions } from '@habboapi/common';
import { IItemBase, IItemBaseList } from '../interfaces';

@Injectable()
export class ItemBaseService
{
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>,
        @InjectRepository(ItemBaseEntity)
        private readonly itemBaseRepository: Repository<ItemBaseEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IItemBaseList>
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
                    const columnMetadata = this.itemBaseRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.itemBaseRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.itemBaseRepository.findAndCount({
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

    async getOne(itemBaseId: number, relations?: Array<string>): Promise<IItemBase>
    {
        if(!itemBaseId) throw new Error(`invalidParameters`);

        return await this.itemBaseRepository.findOne({
            where: { id: itemBaseId },
            relations: relations
        });
    }

    async put(item: IItemBase): Promise<IItemBase>
    {
        if(!item) throw new Error(`invalidParameters`);

        const add: IItemBase = {
            id: null,
            itemName: item.itemName || null,
            publicName: item.publicName || null,
            type: item.type || 's',
            width: item.width || 1,
            length: item.length || 1,
            stackHeight: item.stackHeight || 0,
            allowStack: item.allowStack || '0',
            allowSit: item.allowSit || '0',
            allowLay: item.allowLay || '0',
            allowWalk: item.allowWalk || '0',
            spriteId: item.spriteId || 0,
            allowRecycle: item.allowRecycle || '1',
            allowTrade: item.allowTrade || '1',
            allowMarketplaceSell: item.allowMarketplaceSell || '1',
            allowGift: item.allowGift || '1',
            allowInventoryStack: item.allowInventoryStack || '1',
            interactionType: item.interactionType || 'default',
            interactionModesCount: item.interactionModesCount || 1,
            vendingIds: item.vendingIds || '0',
            multiHeight: item.multiHeight || '0',
            effectIdMale: item.effectIdMale || 0,
            effectIdFemale: item.effectIdFemale || 0,
            customParams: item.customParams || null
        };

        if(!add.itemName || !add.publicName) throw new Error(`invalidItemBase`);

        return await this.itemBaseRepository.save(add);
    }

    async patch(itemBaseId: number, item: IItemBase): Promise<IItemBase>
    {
        if(!itemBaseId || !item) throw new Error(`invalidParameters`);

        const result = await this.itemBaseRepository.findOne(itemBaseId);

        if(!result) throw new Error(`invalidItemBase`);

        const update: IItemBase = {
            id: +itemBaseId,
            itemName: item.itemName || result.itemName,
            publicName: item.publicName || result.publicName,
            type: item.type || result.type,
            width: item.width || result.width,
            length: item.length || result.length,
            stackHeight: item.stackHeight || result.stackHeight,
            allowStack: item.allowStack || result.allowStack,
            allowSit: item.allowSit || result.allowSit,
            allowLay: item.allowLay || result.allowLay,
            allowWalk: item.allowWalk || result.allowWalk,
            spriteId: item.spriteId || result.spriteId,
            allowRecycle: item.allowRecycle || result.allowRecycle,
            allowTrade: item.allowTrade || result.allowTrade,
            allowMarketplaceSell: item.allowMarketplaceSell || result.allowMarketplaceSell,
            allowGift: item.allowGift || result.allowGift,
            allowInventoryStack: item.allowInventoryStack || result.allowInventoryStack,
            interactionType: item.interactionType || result.interactionType,
            interactionModesCount: item.interactionModesCount || result.interactionModesCount,
            vendingIds: item.vendingIds || result.vendingIds,
            multiHeight: item.multiHeight || result.multiHeight,
            effectIdMale: item.effectIdMale || result.effectIdMale,
            effectIdFemale: item.effectIdFemale || result.effectIdFemale,
            customParams: item.customParams || result.customParams
        };

        if(!update.itemName || !update.publicName) throw new Error(`invalidItemBase`);

        await this.itemBaseRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: itemBaseId })
            .execute();

        return update;
    }

    async delete(itemBaseId: number): Promise<boolean>
    {
        if(!itemBaseId) throw new Error(`invalidParameters`);

        await this.itemBaseRepository.delete({ id: itemBaseId });

        await this.itemRepository.delete({ itemId: itemBaseId });

        return true;
    }
}