import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper } from '@habboapi/common';

import { RoomEntity } from '../entities';
import { IRoom, IRoomList } from '../interfaces';

@Injectable()
export class RoomService
{
    constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IRoomList>
    {
        return await RepositoryHelper.search(this.roomRepository, searchOptions || null);
    }

    async getOne(roomId: number, relations?: string[]): Promise<IRoom>
    {
        if(!roomId) return Promise.reject('invalid_parameters');

        return await this.roomRepository.findOne({
            where: { id: roomId },
            relations: relations
        });
    }

    async totalRooms(): Promise<number>
    {
        return await this.roomRepository.count();
    }
}