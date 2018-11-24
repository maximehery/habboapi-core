import { Repository } from 'typeorm';
import { BackupService } from '@habboapi/common';
import { ChatlogRoomEntity } from '../entities/chatlogRoom.entity';
import { ISearchOptions } from '@habboapi/common';
import { IChatlogRoom, IChatlogRoomList } from '../interfaces';
export declare class ChatlogRoomService {
    private readonly backupService;
    private readonly chatlogRoomRepository;
    constructor(backupService: BackupService, chatlogRoomRepository: Repository<ChatlogRoomEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IChatlogRoomList>;
    getOne(chatlogId: number, relations?: Array<string>): Promise<IChatlogRoom>;
    delete(chatlogId: number): Promise<boolean>;
    backupAndTruncate(): Promise<boolean>;
}
