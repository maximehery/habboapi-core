import { Repository } from 'typeorm';
import { BackupService } from '@habboapi/common';
import { ChatlogPrivateEntity } from '../entities/chatlogPrivate.entity';
import { ISearchOptions } from '@habboapi/common';
import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';
export declare class ChatlogPrivateService {
    private readonly backupService;
    private readonly chatlogPrivateRepository;
    constructor(backupService: BackupService, chatlogPrivateRepository: Repository<ChatlogPrivateEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IChatlogPrivateList>;
    getOne(chatlogId: number, relations?: Array<string>): Promise<IChatlogPrivate>;
    delete(chatlogId: number): Promise<boolean>;
    backupAndTruncate(): Promise<boolean>;
}
