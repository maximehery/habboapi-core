import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';
import { ISearchOptions } from '@habboapi/common';
import { IRoom, IRoomList } from '../interfaces';
export declare class RoomService {
    private readonly roomRepository;
    constructor(roomRepository: Repository<RoomEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IRoomList>;
    getOne(roomId: number, relations?: Array<string>): Promise<IRoom>;
}
