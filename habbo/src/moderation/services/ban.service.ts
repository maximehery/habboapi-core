import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Equal, Like } from 'typeorm';

import { TimeHelper } from '@habboapi/common';

import { BanEntity } from '../entities/ban.entity';

import { ISearchOptions } from '@habboapi/common';
import { IBan, IBanList } from '../interfaces';

@Injectable()
export class BanService
{
    constructor(
        @InjectRepository(BanEntity)
        private readonly banRepository: Repository<BanEntity>) {}

    async getAll(searchOptions?: ISearchOptions): Promise<IBanList>
    {
        const search: ISearchOptions = {
            where:      searchOptions.where || null,
            order:      searchOptions.order || null,
            limit:      searchOptions.limit && searchOptions.limit >= 20 ? +searchOptions.limit : 20,
            page:       +searchOptions.page || 1,
            relations:  searchOptions.relations
        };

        let searchWhereOptions = {};
        let searchOrderOptions = {};

        if(search.where && search.where.length >= 1)
        {
            search.where.forEach(where =>
            {
                if(where.column && where.operator && where.value)
                {
                    const columnMetadata = this.banRepository.metadata.columns.find(column => column.propertyName == where.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidSearchColumn: ${where.column}`);

                    if(where.operator == 'equals') return searchWhereOptions[columnMetadata.propertyName]       = Equal(where.value);
                    else if(where.operator == 'like') return searchWhereOptions[columnMetadata.propertyName]    = Like(`%${where.value}%`);
                    else throw new Error(`invalidSearchOperator: ${where.operator}`);
                }

                throw new Error(`invalidSearch: ${where.column}:${where.operator}:${where.value}`);
            });
        }

        if(search.order && search.order.length >= 1)
        {
            search.order.forEach(order =>
            {
                if(order.column && order.sort)
                {
                    const columnMetadata = this.banRepository.metadata.columns.find(column => column.propertyName == order.column && column.isSelect == true);

                    if(!columnMetadata) throw new Error(`invalidOrderColumn: ${order.column}`);

                    if(order.sort == 'ASC' || order.sort == 'DESC') return searchOrderOptions[columnMetadata.propertyName] = order.sort;
                    else throw new Error(`invalidOrderType: ${order.sort}`);
                }

                throw new Error(`invalidOrder: ${order.column}:${order.sort}`);
            });
        }

        const result = await this.banRepository.findAndCount({
            where: searchWhereOptions,
            order: searchOrderOptions,
            take: search.limit,
            skip: (search.page - 1) * search.limit,
            relations: search.relations
        });

        let nextPage        = search.page + 1;
        let previousPage    = search.page - 1;
        let totalPages      = Math.ceil(+result[1] / search.limit);
        let totalItems      = +result[1];

        return {
            items: result[0],
            pagination: {
                currentPage: search.page,
                nextPage: nextPage > totalPages ? search.page > totalPages ? 1 : search.page : nextPage,
                previousPage: previousPage > totalPages ? 1 : previousPage || 1,
                totalPages: totalPages,
                totalItems: totalItems
            }
        };
    }

    async getOne(banId: number, relations?: Array<string>): Promise<IBan>
    {
        if(!banId) throw new Error(`invalidParameters`);

        return await this.banRepository.findOne({
            where: { id: banId },
            relations: relations
        });
    }

    async put(ban: IBan, staffId: number): Promise<IBan>
    {
        if(!ban) throw new Error(`invalidParameters`);

        const add: IBan = {
            id: null,
            userId: ban.userId || 0,
            ip: ban.ip || '',
            machineId: ban.machineId || '',
            userStaffId: staffId || 0,
            timestamp: TimeHelper.timestampNow(),
            banExpire: TimeHelper.addToTimestampNow(ban.banExpire),
            banReason: ban.banReason || '',
            type: ban.type || 'account',
            cfhTopic: 0
        };

        if(add.type == 'account' && !add.userId || add.type == 'ip' && !add.ip || add.type == 'machine' && !add.machineId) throw new Error(`invalidBan`);

        return await this.banRepository.save(add);
    }

    async patch(banId: number, ban: IBan): Promise<IBan>
    {
        if(!banId || !ban) throw new Error(`invalidParameters`);

        const result = await this.banRepository.findOne(banId);

        if(!result) throw new Error(`invalidBan`);

        const update: IBan = {
            id: +banId,
            userId: ban.userId || result.userId,
            ip: ban.ip || result.ip,
            machineId: ban.machineId || result.machineId,
            userStaffId: result.userStaffId,
            timestamp: result.timestamp,
            banExpire: TimeHelper.addToTimestampNow(ban.banExpire),
            banReason: ban.banReason || '',
            type: ban.type || 'account',
            cfhTopic: 0
        };

        if(update.type == 'account' && !update.userId || update.type == 'ip' && !update.ip || update.type == 'machine' && !update.machineId) throw new Error(`invalidBan`);

        await this.banRepository
            .createQueryBuilder()
            .update()
            .set(update)
            .where('id = :id', { id: banId })
            .execute();

        return update;
    }

    async delete(banId: number): Promise<boolean>
    {
        if(!banId) throw new Error(`invalidParameters`);

        await this.banRepository.delete({ id: banId });

        return true;
    }
}