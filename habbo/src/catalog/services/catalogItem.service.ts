import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { CatalogItemEntity } from '../entities';
import { ICatalogItem, ICatalogItemList } from '../interfaces';

@Injectable()
export class CatalogItemService
{
    constructor(
        @InjectRepository(CatalogItemEntity)
        private readonly catalogItemRepository: Repository<CatalogItemEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<ICatalogItemList>
    {
        return await RepositoryHelper.search(this.catalogItemRepository, searchOptions || null);
    }

    async getOne(itemId: number, relations?: string[]): Promise<ICatalogItem>
    {
        if(!itemId) return Promise.reject('invalid_parameters');

        return await this.catalogItemRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async put(item: ICatalogItem): Promise<ICatalogItem>
    {
        if(!item) return Promise.reject('invalid_parameters');

        const add: ICatalogItem = {
            id: null,
            pageId: +item.pageId || 0,
            itemIds: item.itemIds || 0,
            catalogName: item.catalogName || null,
            costCredits: +item.costCredits || 0,
            costPoints: +item.costPoints || 0,
            pointsType: +item.pointsType || 0,
            amount: +item.amount || 1,
            songId: +item.songId || 0,
            limitedStack: +item.limitedStack || 0,
            limitedSells: 0,
            extraData: item.extraData || '',
            clubOnly: item.clubOnly || '0',
            haveOffer: item.haveOffer || '1',
            offerId: +item.offerId || 0,
            orderNum: +item.orderNum || 0
        };

        if(!add.pageId || !add.itemIds || !add.catalogName) return Promise.reject('invalid_item');

        return await this.catalogItemRepository.save(add);
    }

    async patch(itemId: number, item: ICatalogItem): Promise<ICatalogItem>
    {
        if(!itemId || !item) return Promise.reject('invalid_parameters');

        const result = await this.catalogItemRepository.findOne(itemId);

        if(!result) return Promise.reject('invalid_item');

        const update: ICatalogItem = {
            id: +itemId,
            pageId: +item.pageId || result.pageId,
            itemIds: item.itemIds || result.itemIds,
            catalogName: item.catalogName || result.catalogName,
            costCredits: +item.costCredits || result.costCredits,
            costPoints: +item.costPoints || result.costPoints,
            pointsType: +item.pointsType || result.pointsType,
            amount: +item.amount || result.amount,
            songId: +item.songId || result.songId,
            limitedStack: +item.limitedStack || result.limitedStack,
            limitedSells: +result.limitedSells,
            extraData: item.extraData || result.extraData,
            clubOnly: item.clubOnly || result.clubOnly,
            haveOffer: item.haveOffer || result.haveOffer,
            offerId: +item.offerId || result.offerId,
            orderNum: +item.orderNum || result.orderNum
        };

        if(!update.pageId || !update.itemIds || !update.catalogName) return Promise.reject('invalid_item');

        await this.catalogItemRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: itemId })
            .execute();

        return Promise.resolve(update);
    }

    async delete(itemId: number): Promise<boolean>
    {
        if(!itemId) return Promise.reject('invalid_parameters');

        await this.catalogItemRepository.delete({ id: itemId });

        return Promise.resolve(true);
    }

    async totalItems(): Promise<number>
    {
        return await this.catalogItemRepository.count();
    }
}