import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { RoomEntity } from './room.entity';

import { UserEntity } from '../../user/entities/user.entity';

@Entity('room_mute')
export class RoomMuteEntity
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
    muteRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    muteUser?: UserEntity;
}