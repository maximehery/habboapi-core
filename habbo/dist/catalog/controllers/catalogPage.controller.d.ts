import { CatalogPageService } from '../services/catalogPage.service';
import { ICatalogPage, ICatalogPageList } from '../interfaces';
export declare class CatalogPageController {
    private readonly catalogPageService;
    constructor(catalogPageService: CatalogPageService);
    getAll(params: any): Promise<ICatalogPageList>;
    getOne(params: any): Promise<ICatalogPage>;
    searchAll(body: any): Promise<ICatalogPageList>;
    patch(params: any, body: any): Promise<ICatalogPage>;
    add(body: any): Promise<ICatalogPage>;
    delete(params: any): Promise<any>;
}
