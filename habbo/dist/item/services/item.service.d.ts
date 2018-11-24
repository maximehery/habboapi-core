import { Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { ISearchOptions } from '@habboapi/common';
import { IItem, IItemList } from '../interfaces';
export declare class ItemService {
    private readonly itemRepository;
    constructor(itemRepository: Repository<ItemEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IItemList>;
    getOne(itemId: number, relations?: Array<string>): Promise<IItem>;
    put(item: IItem): Promise<IItem>;
    patch(itemId: number, item: IItem): Promise<IItem>;
    delete(itemId: number): Promise<boolean>;
}
