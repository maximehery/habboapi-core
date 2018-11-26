import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import { RoomEntity } from './room.entity';

@Entity('room_models')
export class RoomModelEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'door_x' })
    doorX: number;

    @Column({ name: 'dooy_y' })
    doorY: number;

    @Column({ name: 'door_dir' })
    doorDir: number;

    @Column({ name: 'heightmap' })
    heightmap: string;

    @Column({ name: 'public_items' })
    publicItems: string;

    @Column({ name: 'club_only', type: 'enum', enum: ['0', '1'] })
    clubOnly: '0' | '1';

    @OneToMany(type => RoomEntity, room => room.roomModelDefinition)
    modelRooms?: RoomEntity[];
}