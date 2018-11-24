import { ChatlogRoomService } from '../services/chatlogRoom.service';
import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';
export declare class ChatlogRoomController {
    private readonly chatlogRoomService;
    constructor(chatlogRoomService: ChatlogRoomService);
    getAll(params: any): Promise<IChatlogPrivateList>;
    backup(params: any): Promise<any>;
    getOne(params: any): Promise<IChatlogPrivate>;
    searchAll(body: any): Promise<IChatlogPrivateList>;
    delete(params: any): Promise<any>;
}
