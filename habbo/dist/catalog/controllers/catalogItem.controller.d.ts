import { CatalogItemService } from '../services/catalogItem.service';
import { ICatalogItem, ICatalogItemList } from '../interfaces';
export declare class CatalogItemController {
    private readonly catalogItemService;
    constructor(catalogItemService: CatalogItemService);
    getAll(params: any): Promise<ICatalogItemList>;
    getOne(params: any): Promise<ICatalogItem>;
    searchAll(body: any): Promise<ICatalogItemList>;
    patch(params: any, body: any): Promise<ICatalogItem>;
    add(body: any): Promise<ICatalogItem>;
    delete(params: any): Promise<any>;
}
