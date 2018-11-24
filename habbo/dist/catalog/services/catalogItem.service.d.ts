import { Repository } from 'typeorm';
import { CatalogItemEntity } from '../entities/catalogItem.entity';
import { ISearchOptions } from '@habboapi/common';
import { ICatalogItem, ICatalogItemList } from '../interfaces';
export declare class CatalogItemService {
    private readonly catalogItemRepository;
    constructor(catalogItemRepository: Repository<CatalogItemEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<ICatalogItemList>;
    getOne(itemId: number, relations?: Array<string>): Promise<ICatalogItem>;
    put(item: ICatalogItem): Promise<ICatalogItem>;
    patch(itemId: number, item: ICatalogItem): Promise<ICatalogItem>;
    delete(itemId: number): Promise<boolean>;
}
