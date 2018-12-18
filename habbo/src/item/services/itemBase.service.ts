import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { ItemBaseEntity } from '../entities';
import { IItemBase, IItemBaseList } from '../interfaces';

import { ItemService } from './item.service';

@Injectable()
export class ItemBaseService
{
    constructor(
        private readonly itemService: ItemService,
        @InjectRepository(ItemBaseEntity)
        private readonly itemBaseRepository: Repository<ItemBaseEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IItemBaseList>
    {
        return await RepositoryHelper.search(this.itemBaseRepository, searchOptions || null);
    }

    async getOne(itemBaseId: number, relations?: string[]): Promise<IItemBase>
    {
        if(!itemBaseId) return Promise.reject('invalid_parameters');

        return await this.itemBaseRepository.findOne({
            where: { id: itemBaseId },
            relations: relations
        });
    }

    async put(item: IItemBase): Promise<IItemBase>
    {
        if(!item) return Promise.reject('invalid_parameters');

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

        if(!add.itemName || !add.publicName) return Promise.reject('invalid_item_base');

        return await this.itemBaseRepository.save(add);
    }

    async patch(itemBaseId: number, item: IItemBase): Promise<IItemBase>
    {
        if(!itemBaseId || !item) return Promise.reject('invalid_parameters');

        const result = await this.itemBaseRepository.findOne(itemBaseId);

        if(!result) return Promise.reject('invalid_item_base');

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

        if(!update.itemName || !update.publicName) return Promise.reject('invalid_item_base');

        await this.itemBaseRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: itemBaseId })
            .execute();

        return Promise.resolve(update);
    }

    async delete(itemBaseId: number): Promise<boolean>
    {
        if(!itemBaseId) return Promise.reject('invalid_parameters');

        await this.itemBaseRepository.delete({ id: itemBaseId });

        await this.itemService.delete(itemBaseId);

        return Promise.resolve(true);
    }

    async totalItems(): Promise<number>
    {
        return await this.itemBaseRepository.count();
    }
}