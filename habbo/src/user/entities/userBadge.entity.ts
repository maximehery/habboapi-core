import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('users_badges')
export class UserBadgeEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'slot_id' })
    slotId: number;

    @Column({ name: 'badge_code' })
    badgeCode: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    badgeUser?: UserEntity;
}