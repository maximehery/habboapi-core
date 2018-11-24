import { Repository } from 'typeorm';
import { UserCurrencyEntity } from '../entities/userCurrency.entity';
export declare class UserCurrencyService {
    private readonly userCurrencyRepository;
    constructor(userCurrencyRepository: Repository<UserCurrencyEntity>);
    modifyCurrency(userIds: Array<number>, type: number, amount: number): Promise<boolean>;
}
