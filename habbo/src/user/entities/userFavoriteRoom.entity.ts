import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from './user.entity';

@Entity('users_favorite_rooms')
export class UserFavoriteRoomEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'room_id' })
    type: number;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    favoriteUser?: UserEntity;
}