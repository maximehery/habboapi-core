import { ChatlogPrivateService } from '../services/chatlogPrivate.service';
import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';
export declare class ChatlogPrivateController {
    private readonly chatlogPrivateService;
    constructor(chatlogPrivateService: ChatlogPrivateService);
    getAll(params: any): Promise<IChatlogPrivateList>;
    backup(params: any): Promise<any>;
    getOne(params: any): Promise<IChatlogPrivate>;
    searchAll(body: any): Promise<IChatlogPrivateList>;
    delete(params: any): Promise<any>;
}
