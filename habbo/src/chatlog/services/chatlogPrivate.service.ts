import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper, BackupService } from '@habboapi/common';

import { ChatlogPrivateEntity } from '../entities';
import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';

@Injectable()
export class ChatlogPrivateService
{
    constructor(
        private readonly backupService: BackupService,
        @InjectRepository(ChatlogPrivateEntity)
        private readonly chatlogPrivateRepository: Repository<ChatlogPrivateEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IChatlogPrivateList>
    {
        return await RepositoryHelper.search(this.chatlogPrivateRepository, searchOptions || null);
    }

    async getOne(chatlogId: number, relations?: string[]): Promise<IChatlogPrivate>
    {
        if(!chatlogId) return Promise.reject('invalid_parameters');

        return await this.chatlogPrivateRepository.findOne({
            where: { id: chatlogId },
            relations: relations
        });
    }

    async delete(chatlogId: number): Promise<boolean>
    {
        if(!chatlogId) return Promise.reject('invalid_parameters');

        await this.chatlogPrivateRepository.delete({ id: chatlogId });

        return Promise.resolve(true);
    }

    async backupAndTruncate(): Promise<boolean>
    {
        await this.backupService.backupMysql('chatlogs_private');

        await this.chatlogPrivateRepository.clear();

        return true;
    }

    async totalChatlogs(): Promise<number>
    {
        return await this.chatlogPrivateRepository.count();
    }
}