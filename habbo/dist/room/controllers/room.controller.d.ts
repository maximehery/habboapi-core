import { RoomService } from '../services/room.service';
import { IRoom, IRoomList } from '../interfaces';
export declare class RoomController {
    private readonly roomService;
    constructor(roomService: RoomService);
    getAll(params: any): Promise<IRoomList>;
    getOne(params: any): Promise<IRoom>;
    searchAll(body: any): Promise<IRoomList>;
}
