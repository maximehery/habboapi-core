import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

@Entity('commandlogs')
export class ChatlogCommandEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @Column({ name: 'command' })
    command: string;

    @Column({ name: 'params' })
    params: string;

    @Column({ name: 'success', type: 'enum', enum: ['0', '1'] })
    success: '0' | '1';

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    chatlogUser?: UserEntity;
}