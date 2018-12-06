import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { ItemEntity } from '../entities/item.entity';
import { IItem, IItemList } from '../interfaces';

@Injectable()
export class ItemService
{
    constructor(
        @InjectRepository(ItemEntity)
        private readonly itemRepository: Repository<ItemEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IItemList>
    {
        return await RepositoryHelper.search(this.itemRepository, searchOptions || null);
    }

    async getOne(itemId: number, relations?: Array<string>): Promise<IItem>
    {
        if(!itemId) return Promise.reject('invalid_parameters');

        return await this.itemRepository.findOne({
            where: { id: itemId },
            relations: relations
        });
    }

    async put(item: IItem): Promise<IItem>
    {
        if(!item) return Promise.reject('invalid_parameters');

        const add: IItem = {
            id: null,
            userId: item.userId || 0,
            roomId: item.roomId || 0,
            itemId: item.itemId || 0,
            wallPos: item.wallPos || 0,
            x: item.x || 0,
            y: item.y || 0,
            z: item.z || 0,
            rot: item.rot || 0,
            extraData: item.extraData || '',
            wiredData: item.wiredData || '',
            limitedData: item.limitedData || '0:0',
            groupId: item.groupId || 0
        };

        if(!add.userId || !add.itemId) return Promise.reject('invalid_item');

        return await this.itemRepository.save(add);
    }

    async patch(itemId: number, item: IItem): Promise<IItem>
    {
        if(!itemId || !item) throw new Error('invalid_parameters');

        const result = await this.itemRepository.findOne(itemId);

        if(!result) return Promise.reject('invalid_item');

        const update: IItem = {
            id: +itemId,
            userId: item.userId || result.userId,
            roomId: item.roomId || result.roomId,
            itemId: item.itemId || result.itemId,
            wallPos: item.wallPos || result.wallPos,
            x: item.x || result.x,
            y: item.y || result.y,
            z: item.z || result.z,
            rot: item.rot || result.rot,
            extraData: item.extraData || result.extraData,
            wiredData: item.wiredData || result.wiredData,
            limitedData: item.limitedData || result.limitedData,
            groupId: item.groupId || result.groupId
        };

        if(!update.userId || !update.itemId) return Promise.reject('invalid_item');

        await this.itemRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: itemId })
            .execute();

        return Promise.resolve(update);
    }

    async delete(itemId: number): Promise<boolean>
    {
        if(!itemId) return Promise.reject('invalid_parameters');

        await this.itemRepository.delete({ id: itemId });

        return Promise.resolve(true);
    }

    async totalItems(): Promise<number>
    {
        return await this.itemRepository.count();
    }
}