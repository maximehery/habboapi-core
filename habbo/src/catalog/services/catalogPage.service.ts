import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { CatalogPageEntity } from '../entities/catalogPage.entity';

import { ISearchOptions } from '@habboapi/common';
import { ICatalogPage, ICatalogPageList } from '../interfaces';

@Injectable()
export class CatalogPageService
{
    constructor(
        @InjectRepository(CatalogPageEntity)
        private readonly catalogPageRepository: Repository<CatalogPageEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<ICatalogPageList>
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
                    const columnMetadata = this.catalogPageRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

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
                    const columnMetadata = this.catalogPageRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.catalogPageRepository.findAndCount({
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

    async getOne(pageId: number, relations?: Array<string>): Promise<ICatalogPage>
    {
        if(!pageId) throw new Error(`invalidParameters`);

        return await this.catalogPageRepository.findOne({
            where: { id: pageId },
            relations: relations
        });
    }

    async put(page: ICatalogPage): Promise<ICatalogPage>
    {
        if(!page) throw new Error(`invalidParameters`);

        const add: ICatalogPage = {
            id: null,
            parentId: page.parentId || -1,
            captionSave: page.captionSave || '',
            caption: page.caption || null,
            iconColor: page.iconColor || 1,
            iconImage: page.iconImage || 1,
            visible: page.visible || '1',
            enabled: page.enabled || '1',
            minRank: page.minRank || 1,
            clubOnly: page.clubOnly || '0',
            orderNum: page.orderNum || 0,
            pageLayout: page.pageLayout || 'default_3x3',
            pageHeadline: page.pageHeadline || '',
            pageTeaser: page.pageTeaser || '',
            pageSpecial: page.pageSpecial || '',
            pageText1: page.pageText1 || '',
            pageText2: page.pageText2 || '',
            pageTextDetails: page.pageTextDetails || '',
            pageTextTeaser: page.pageTextTeaser || '',
            vipOnly: page.vipOnly || '0',
            includes: page.includes || '',
            roomId: page.roomId || 0
        };

        if(!add.caption) throw new Error(`invalidPage`);

        return await this.catalogPageRepository.save(add);
    }

    async patch(pageId: number, page: ICatalogPage): Promise<ICatalogPage>
    {
        if(!pageId || !page) throw new Error(`invalidParameters`);

        const result = await this.catalogPageRepository.findOne(pageId);

        if(!result) throw new Error(`invalidPage`);

        const update: ICatalogPage = {
            id: pageId,
            parentId: page.parentId || result.parentId,
            captionSave: page.captionSave || result.captionSave,
            caption: page.caption || result.caption,
            iconColor: page.iconColor || result.iconColor,
            iconImage: page.iconImage || result.iconImage,
            visible: page.visible || result.visible,
            enabled: page.enabled || result.enabled,
            minRank: page.minRank || result.minRank,
            clubOnly: page.clubOnly || result.clubOnly,
            orderNum: page.orderNum || result.orderNum,
            pageLayout: page.pageLayout || result.pageLayout,
            pageHeadline: page.pageHeadline || result.pageHeadline,
            pageTeaser: page.pageTeaser || result.pageTeaser,
            pageSpecial: page.pageSpecial || result.pageSpecial,
            pageText1: page.pageText1 || result.pageText1,
            pageText2: page.pageText2 || result.pageText2,
            pageTextDetails: page.pageTextDetails || result.pageTextDetails,
            pageTextTeaser: page.pageTextTeaser || result.pageTextDetails,
            vipOnly: page.vipOnly || result.vipOnly,
            includes: page.includes || result.includes,
            roomId: page.roomId || result.roomId
        };

        if(!update.caption) throw new Error(`invalidPage`);

        await this.catalogPageRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: pageId })
            .execute();

        return update;
    }

    async delete(pageId: number): Promise<boolean>
    {
        if(!pageId) throw new Error(`invalidParameters`);

        await this.catalogPageRepository.delete({ id: pageId });

        return true;
    }
}