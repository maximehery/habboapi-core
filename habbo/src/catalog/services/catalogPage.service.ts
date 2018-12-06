import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { CatalogPageEntity } from '../entities/catalogPage.entity';
import { ICatalogPage, ICatalogPageList } from '../interfaces';

@Injectable()
export class CatalogPageService
{
    constructor(
        @InjectRepository(CatalogPageEntity)
        private readonly catalogPageRepository: Repository<CatalogPageEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<ICatalogPageList>
    {
        return await RepositoryHelper.search(this.catalogPageRepository, searchOptions || null);
    }

    async getOne(pageId: number, relations?: Array<string>): Promise<ICatalogPage>
    {
        if(!pageId) return Promise.reject('invalid_parameters');

        return await this.catalogPageRepository.findOne({
            where: { id: pageId },
            relations: relations
        });
    }

    async put(page: ICatalogPage): Promise<ICatalogPage>
    {
        if(!page) return Promise.reject('invalid_parameters');

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

        if(!add.caption) return Promise.reject('invalid_item');

        return await this.catalogPageRepository.save(add);
    }

    async patch(pageId: number, page: ICatalogPage): Promise<ICatalogPage>
    {
        if(!pageId || !page) return Promise.reject('invalid_parameters');

        const result = await this.catalogPageRepository.findOne(pageId);

        if(!result) return Promise.reject('invalid_item');

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

        if(!update.caption) return Promise.reject('invalid_item');

        await this.catalogPageRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: pageId })
            .execute();

        return Promise.resolve(update);
    }

    async delete(pageId: number): Promise<boolean>
    {
        if(!pageId) return Promise.reject('invalid_parameters');

        await this.catalogPageRepository.delete({ id: pageId });

        return Promise.resolve(true);
    }

    async totalPages(): Promise<number>
    {
        return await this.catalogPageRepository.count();
    }
}