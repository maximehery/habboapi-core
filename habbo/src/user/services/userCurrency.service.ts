import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserCurrencyEntity } from '../entities';

@Injectable()
export class UserCurrencyService
{
    constructor(
        @InjectRepository(UserCurrencyEntity)
        private readonly userCurrencyRepository: Repository<UserCurrencyEntity>) {}
        
    async modifyCurrency(userIds: number[], type: number, amount: number): Promise<boolean>
    {
        if(!userIds || !type || !amount) return Promise.reject('invalid_parameters');

        let values: { userId: number, type: number, amount: number }[] = [];

        userIds.forEach(userId =>
        {
            values.push({
                userId: userId,
                type: type,
                amount: amount
            });
        });

        if(!values) return Promise.reject('invalid_parameters');

        values.forEach(async value =>
        {
            const findCurrency = await this.userCurrencyRepository.findOne({
                where: { userId: value.userId, type: value.type }
            });
            
            if(findCurrency) await this.userCurrencyRepository.save({
                id: findCurrency.id,
                amount: +findCurrency.amount + amount
            });
            
            else await this.userCurrencyRepository.save(value);
        });

        return Promise.resolve(true);
    }
}