import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { CatalogItemEntity } from '../entities/catalogItem.entity';

import { ISearchOptions } from '@habboapi/common';
import { ICatalogItem, ICatalogItemList } from '../interfaces';

@Injectable()
export class CatalogItemService
{
    constructor(
        @InjectRepository(CatalogItemEntity)
        private readonly catalogItemRepository: Repository<CatalogItemEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<ICatalogItemList>
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
                    const columnMetadata = this.catalogItemRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.catalogItemRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.catalogItemRepository.findAndCount({
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

    async getOne(itemId: number, relations?: Array<string>): Promise<ICatalogItem>
    {
        if(!itemId) throw new Error(`invalidParameters`);

        return await this.catalogItemRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async put(item: ICatalogItem): Promise<ICatalogItem>
    {
        if(!item) throw new Error(`invalidParameters`);

        const add: ICatalogItem = {
            id: null,
            pageId: item.pageId || 0,
            itemIds: item.itemIds || 0,
            catalogName: item.catalogName || null,
            costCredits: item.costCredits || 0,
            costPoints: item.costPoints || 0,
            pointsType: item.pointsType || 0,
            amount: item.amount || 1,
            songId: item.songId || 0,
            limitedStack: item.limitedStack || 0,
            limitedSells: 0,
            extraData: item.extraData || '',
            clubOnly: item.clubOnly || '0',
            haveOffer: item.haveOffer || '1',
            offerId: item.offerId || 0,
            orderNum: item.orderNum || 0,
            badge: item.badge || ''
        };

        if(!add.pageId || !add.itemIds || !add.catalogName) throw new Error(`invalidItem`);

        return await this.catalogItemRepository.save(add);
    }

    async patch(itemId: number, item: ICatalogItem): Promise<ICatalogItem>
    {
        if(!itemId || !item) throw new Error(`invalidParameters`);

        const result = await this.catalogItemRepository.findOne(itemId);

        if(!result) throw new Error(`invalidItem`);

        const update: ICatalogItem = {
            id: +itemId,
            pageId: item.pageId || result.pageId,
            itemIds: item.itemIds || result.itemIds,
            catalogName: item.catalogName || result.catalogName,
            costCredits: item.costCredits || result.costCredits,
            costPoints: item.costPoints || result.costPoints,
            pointsType: item.pointsType || result.pointsType,
            amount: item.amount || result.amount,
            songId: item.songId || result.songId,
            limitedStack: item.limitedStack || result.limitedStack,
            limitedSells: result.limitedSells,
            extraData: item.extraData || result.extraData,
            clubOnly: item.clubOnly || result.clubOnly,
            haveOffer: item.haveOffer || result.haveOffer,
            offerId: item.offerId || result.offerId,
            orderNum: item.orderNum || result.orderNum,
            badge: item.badge || result.badge
        };

        if(!update.pageId || !update.itemIds || !update.catalogName) throw new Error(`invalidItem`);

        await this.catalogItemRepository
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

        await this.catalogItemRepository.delete({ id: itemId });

        return true;
    }
}