import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { RoomEntity } from './room.entity';

import { UserEntity } from '../../user';

@Entity('room_bans')
export class RoomBanEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'room_id' })
    roomId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'ends' })
    ends: number;

    @ManyToOne(type => RoomEntity)
    @JoinColumn({ name: 'room_id'})
    banRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    banUser?: UserEntity;
}