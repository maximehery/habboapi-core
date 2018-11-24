import { Repository } from 'typeorm';
import { CatalogPageEntity } from '../entities/catalogPage.entity';
import { ISearchOptions } from '@habboapi/common';
import { ICatalogPage, ICatalogPageList } from '../interfaces';
export declare class CatalogPageService {
    private readonly catalogPageRepository;
    constructor(catalogPageRepository: Repository<CatalogPageEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<ICatalogPageList>;
    getOne(pageId: number, relations?: Array<string>): Promise<ICatalogPage>;
    put(page: ICatalogPage): Promise<ICatalogPage>;
    patch(pageId: number, page: ICatalogPage): Promise<ICatalogPage>;
    delete(pageId: number): Promise<boolean>;
}
