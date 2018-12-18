import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../../user';

@Entity('chatlogs_private')
export class ChatlogPrivateEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_from_id' })
    userFromId: number;

    @Column({ name: 'user_to_id' })
    userToId: number;

    @Column({ name: 'message' })
    message: string;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_from_id'})
    chatlogUser?: UserEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_to_id'})
    chatlogReciever?: UserEntity;
}