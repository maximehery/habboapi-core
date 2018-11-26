import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('users_currency')
export class UserCurrencyEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'type' })
    type: number;

    @Column({ name: 'amount' })
    amount: number;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    currencyUser?: UserEntity;
}