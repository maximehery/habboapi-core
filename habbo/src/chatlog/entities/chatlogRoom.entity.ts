import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { RoomEntity } from '../../room';
import { UserEntity } from '../../user';

@Entity('chatlogs_room')
export class ChatlogRoomEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'room_id' })
    roomId: number;

    @Column({ name: 'user_from_id' })
    userFromId: number;

    @Column({ name: 'user_to_id' })
    userToId: number;

    @Column({ name: 'message' })
    message: string;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @ManyToOne(type => RoomEntity)
    @JoinColumn({ name: 'room_id'})
    chatlogRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_from_id'})
    chatlogUser?: UserEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_to_id'})
    chatlogReciever?: UserEntity;
}