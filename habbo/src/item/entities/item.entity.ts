import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

import { ItemBaseEntity } from './itemBase.entity';

import { GroupEntity } from '../../group/entities/group.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('items')
export class ItemEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'room_id' })
    roomId: number;

    @Column({ name: 'item_id' })
    itemId: number;

    @Column({ name: 'wall_pos' })
    wallPos: number;

    @Column({ name: 'x' })
    x: number;

    @Column({ name: 'y' })
    y: number;

    @Column({ name: 'z' })
    z: number;

    @Column({ name: 'rot' })
    rot: number;

    @Column({ name: 'extra_data' })
    extraData: string;

    @Column({ name: 'wired_data' })
    wiredData: string;

    @Column({ name: 'limited_data' })
    limitedData: string;

    @Column({ name: 'guild_id' })
    groupId: number;

    @ManyToOne(type => ItemBaseEntity)
    @JoinColumn({ name: 'item_id'})
    itemBase?: ItemBaseEntity;

    @ManyToOne(type => GroupEntity)
    @JoinColumn({ name: 'guild_id'})
    itemGroup?: GroupEntity;

    @ManyToOne(type => RoomEntity)
    @JoinColumn({ name: 'room_id'})
    itemRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    itemUser?: UserEntity;
}