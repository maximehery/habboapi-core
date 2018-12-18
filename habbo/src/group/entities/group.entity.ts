import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

import { GroupMemberEntity } from './groupMember.entity';

import { ItemEntity } from '../../item';
import { RoomEntity } from '../../room';
import { UserEntity } from '../../user';

@Entity('guilds')
export class GroupEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'room_id' })
    roomId: number;

    @Column({ name: 'state' })
    state: number;

    @Column({ name: 'rights', type: 'enum', enum: ['0', '1'] })
    rights: '0' | '1';

    @Column({ name: 'color_one' })
    colorOne: number;

    @Column({ name: 'color_two' })
    colorTwo: number;

    @Column({ name: 'badge' })
    badge: string;

    @Column({ name: 'date_created' })
    dateCreated: number;

    @Column({ name: 'forum', type: 'enum', enum: ['0', '1'] })
    forum: '0' | '1';

    @Column({ name: 'read_forum', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS'] })
    readForum: 'EVERYONE' | 'MEMBERS' | 'ADMINS';

    @Column({ name: 'post_messages', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS', 'OWNER'] })
    postMessages: 'EVERYONE' | 'MEMBERS' | 'ADMINS' | 'OWNER';

    @Column({ name: 'post_threads', type: 'enum', enum: ['EVERYONE', 'MEMBERS', 'ADMINS', 'OWNER'] })
    postThreads: 'EVERYONE' | 'MEMBERS' | 'ADMINS' | 'OWNER';

    @Column({ name: 'mod_forum', type: 'enum', enum: ['ADMINS', 'OWNER'] })
    modForum: 'ADMINS' | 'OWNER';

    @OneToMany(type => GroupMemberEntity, membership => membership.membershipUser)
    groupMembers?: GroupMemberEntity[];

    @OneToMany(type => ItemEntity, item => item.itemGroup)
    groupItems?: ItemEntity[];

    @OneToOne(type => RoomEntity)
    @JoinColumn({ name: 'room_id'})
    groupRoom?: RoomEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'user_id'})
    groupUser?: UserEntity;
}