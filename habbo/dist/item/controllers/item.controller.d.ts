import { ItemService } from '../services/item.service';
import { IItem, IItemList } from '../interfaces';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    getAll(params: any): Promise<IItemList>;
    getOne(params: any): Promise<IItem>;
    searchAll(body: any): Promise<IItemList>;
    patch(params: any, body: any): Promise<IItem>;
    add(body: any): Promise<IItem>;
    delete(params: any): Promise<any>;
}
