import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper, BackupService } from '@habboapi/common';

import { ChatlogRoomEntity } from '../entities/chatlogRoom.entity';
import { IChatlogRoom, IChatlogRoomList } from '../index';

@Injectable()
export class ChatlogRoomService
{
    constructor(
        private readonly backupService: BackupService,
        @InjectRepository(ChatlogRoomEntity)
        private readonly chatlogRoomRepository: Repository<ChatlogRoomEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IChatlogRoomList>
    {
        return await RepositoryHelper.search(this.chatlogRoomRepository, searchOptions || null);
    }

    async getOne(chatlogId: number, relations?: Array<string>): Promise<IChatlogRoom>
    {
        if(!chatlogId) return Promise.reject('invalid_parameters');

        return await this.chatlogRoomRepository.findOne({
            where: { id: chatlogId },
            relations: relations
        });
    }

    async delete(chatlogId: number): Promise<boolean>
    {
        if(!chatlogId) return Promise.reject('invalid_parameters');

        await this.chatlogRoomRepository.delete({ id: chatlogId });

        return Promise.resolve(true);
    }

    async backupAndTruncate(): Promise<boolean>
    {
        await this.backupService.backupMysql('chatlogs_room');

        await this.chatlogRoomRepository.clear();

        return Promise.resolve(true);
    }

    async totalChatlogs(): Promise<number>
    {
        return this.chatlogRoomRepository.count();
    }
}