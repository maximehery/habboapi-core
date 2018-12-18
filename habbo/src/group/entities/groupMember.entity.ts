import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../../user';

import { GroupEntity } from './group.entity';

@Entity('guilds_members')
export class GroupMemberEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'guild_id' })
    groupId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'level_id' })
    levelId: number;

    @Column({ name: 'member_since' })
    memberSince: number;

    @ManyToOne(type => GroupEntity)
    @JoinColumn({ name: 'guild_id'})
    membershipGroup?: GroupEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    membershipUser?: UserEntity;
}