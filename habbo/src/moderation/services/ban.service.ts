import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ISearchOptions, RepositoryHelper, TimeHelper } from '@habboapi/common';

import { BanEntity } from '../entities';
import { IBan, IBanList } from '../interfaces';

@Injectable()
export class BanService
{
    constructor(
        @InjectRepository(BanEntity)
        private readonly banRepository: Repository<BanEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IBanList>
    {
        return await RepositoryHelper.search(this.banRepository, searchOptions || null);
    }

    async getOne(banId: number, relations?: string[]): Promise<IBan>
    {
        if(!banId) return Promise.reject('invalid_parameters');

        return await this.banRepository.findOne({
            where: { id: banId },
            relations: relations
        });
    }

    async put(ban: IBan, staffId: number): Promise<IBan>
    {
        if(!ban) return Promise.reject('invalid_parameters');

        const add: IBan = {
            id: null,
            userId: +ban.userId || 0,
            ip: ban.ip || '',
            machineId: ban.machineId || '',
            userStaffId: +staffId || 0,
            timestamp: +TimeHelper.timestampNow(),
            banExpire: +TimeHelper.addToTimestampNow(ban.banExpire),
            banReason: ban.banReason || '',
            type: ban.type || 'account',
            cfhTopic: 0
        };

        if(add.type == 'account' && !add.userId || add.type == 'ip' && !add.ip || add.type == 'machine' && !add.machineId) return Promise.reject('invalid_ban');

        return await this.banRepository.save(add);
    }

    async patch(banId: number, ban: IBan): Promise<IBan>
    {
        if(!banId || !ban) return Promise.reject('invalid_parameters');

        const result = await this.banRepository.findOne(banId);

        if(!result) return Promise.reject('invalid_ban');

        const update: IBan = {
            id: +banId,
            userId: +ban.userId || result.userId,
            ip: ban.ip || result.ip,
            machineId: ban.machineId || result.machineId,
            userStaffId: +result.userStaffId,
            timestamp: +result.timestamp,
            banExpire: +TimeHelper.addToTimestampNow(ban.banExpire),
            banReason: ban.banReason || '',
            type: ban.type || 'account',
            cfhTopic: 0
        };

        if(update.type == 'account' && !update.userId || update.type == 'ip' && !update.ip || update.type == 'machine' && !update.machineId) return Promise.reject('invalid_ban');

        await this.banRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: banId })
            .execute();

        return Promise.resolve(update);
    }

    async delete(banId: number): Promise<boolean>
    {
        if(!banId) return Promise.reject('invalid_parameters');

        await this.banRepository.delete({ id: banId });

        return Promise.resolve(true);
    }

    async totalBans(): Promise<number>
    {
        return this.banRepository.count();
    }
}