import { UserEntity } from './user.entity';
export declare class UserCurrencyEntity {
    id: number;
    userId: number;
    type: number;
    amount: number;
    currencyUser?: UserEntity;
}
