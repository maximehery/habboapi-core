import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { UserBadgeEntity } from '../entities';

@Injectable()
export class UserBadgeService
{
    constructor(
        @InjectRepository(UserBadgeEntity)
        private readonly userBadgeRepository: Repository<UserBadgeEntity>) {}

    async giveBadge(userIds: number[], badgeCodes: string[]): Promise<boolean>
    {
        if(!userIds || !badgeCodes) return Promise.reject('invalid_parameters');

        let values: { userId: number, badgeCode: string }[] = [];

        userIds.forEach(user =>
        {
            badgeCodes.forEach(code =>
            {
                values.push({
                    userId: user,
                    badgeCode: code
                });
            });
        });

        if(!values) return Promise.reject('invalid_badges');

        values.forEach(async value => await this.userBadgeRepository.findOne(value) || await this.userBadgeRepository.save(value));

        return true;
    }

    async removeBadge(userIds: number[], badgeCodes: string[]): Promise<boolean>
    {
        if(!userIds || !badgeCodes) return Promise.reject('invalid_parameters');

        await this.userBadgeRepository.delete({ userId: In(userIds), badgeCode: In(badgeCodes) });

        return Promise.resolve(true);
    }
}