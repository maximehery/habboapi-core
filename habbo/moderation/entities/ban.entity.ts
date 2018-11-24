import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

import { UserEntity } from '../../user/entities/user.entity';

@Entity('bans')
export class BanEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'ip' })
    ip: string;

    @Column({ name: 'machine_id' })
    machineId: string;

    @Column({ name: 'user_staff_id' })
    userStaffId: number;

    @Column({ name: 'timestamp' })
    timestamp: number;

    @Column({ name: 'ban_expire' })
    banExpire: number;

    @Column({ name: 'ban_reason' })
    banReason: string;

    @Column({ name: 'type', type: 'enum', enum: ['account', 'ip', 'machine', 'super'] })
    type: 'account' | 'ip' | 'machine' | 'super';

    @Column({ name: 'cfh_topic' })
    cfhTopic: number;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    banUser?: UserEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_staff_id'})
    banStaff?: UserEntity;
}