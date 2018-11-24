import { ItemBaseService } from '../services/itemBase.service';
import { IItemBase, IItemBaseList } from '../interfaces';
export declare class ItemBaseController {
    private readonly itemBaseService;
    constructor(itemBaseService: ItemBaseService);
    getAll(params: any): Promise<IItemBaseList>;
    getOne(params: any): Promise<IItemBase>;
    searchAll(body: any): Promise<IItemBaseList>;
    patch(params: any, body: any): Promise<IItemBase>;
    add(body: any): Promise<IItemBase>;
    delete(params: any): Promise<any>;
}
