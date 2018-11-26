import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { RoomEntity } from './room.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('room_enter_log')
export class RoomEntryEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'room_id' })
    roomId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @Column({ name: 'exit_timestamp' })
    exitTimestamp: number;

    @ManyToOne(type => RoomEntity)
    @JoinColumn({ name: 'room_id'})
    entryRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    entryUser?: UserEntity;
}