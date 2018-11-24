import { Repository } from 'typeorm';
import { ItemEntity } from '../entities/item.entity';
import { ItemBaseEntity } from '../entities/itemBase.entity';
import { ISearchOptions } from '@habboapi/common';
import { IItemBase, IItemBaseList } from '../interfaces';
export declare class ItemBaseService {
    private readonly itemRepository;
    private readonly itemBaseRepository;
    constructor(itemRepository: Repository<ItemEntity>, itemBaseRepository: Repository<ItemBaseEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IItemBaseList>;
    getOne(itemBaseId: number, relations?: Array<string>): Promise<IItemBase>;
    put(item: IItemBase): Promise<IItemBase>;
    patch(itemBaseId: number, item: IItemBase): Promise<IItemBase>;
    delete(itemBaseId: number): Promise<boolean>;
}
