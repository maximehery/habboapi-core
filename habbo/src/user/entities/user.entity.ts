import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { UserBadgeEntity } from './userBadge.entity';
import { UserCurrencyEntity } from './userCurrency.entity';

import { ChatlogPrivateEntity, ChatlogRoomEntity, ChatlogCommandEntity } from '../../chatlog';
import { GroupEntity, GroupMemberEntity } from '../../group';
import { ItemEntity } from '../../item';
import { RoomEntity, RoomBanEntity, RoomEntryEntity, RoomMuteEntity } from '../../room';

@Entity('users')
export class UserEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'real_name', select: false })
    realName: string;

    @Column({ name: 'password', select: false })
    password: string;

    @Column({ name: 'mail' })
    mail: string;

    @Column({ name: 'mail_verified', type: 'enum', enum: ['0', '1'] })
    mailVerified: '0' | '1';

    @Column({ name: 'account_created' })
    accountCreated: number;

    @Column({ name: 'account_day_of_birth', select: false })
    accountBirthday: number;

    @Column({ name: 'last_login' })
    lastLogin: number;

    @Column({ name: 'last_online' })
    lastOnline: number;

    @Column({ name: 'motto' })
    motto: string;

    @Column({ name: 'look' })
    look: string;

    @Column({ name: 'gender', type: 'enum', enum: ['M', 'F'], select: false })
    gender: 'M' | 'F';

    @Column({ name: 'rank' })
    rank: number;

    @Column({ name: 'credits' })
    credits: number;

    @Column({ name: 'pixels', select: false })
    pixels: number;

    @Column({ name: 'points', select: false })
    points: number;

    @Column({ name: 'online', type: 'enum', enum: ['0', '1', '2'] })
    online: '0' | '1' | '2';

    @Column({ name: 'auth_ticket', select: false })
    auth_ticket: string;

    @Column({ name: 'ip_register' })
    ipRegister: string;

    @Column({ name: 'ip_current' })
    ipCurrent: string;

    @Column({ name: 'machine_id' })
    machineId: string;

    @Column({ name: 'home_room' })
    homeRoom: number;

    @OneToMany(type => UserBadgeEntity, badge => badge.badgeUser)
    userBadges?: UserBadgeEntity[];

    @OneToMany(type => UserCurrencyEntity, currency => currency.currencyUser)
    userCurrencies?: UserCurrencyEntity[];

    @OneToMany(type => ChatlogPrivateEntity, chatlog => chatlog.chatlogUser)
    userChatlogRoom: ChatlogPrivateEntity[];

    @OneToMany(type => ChatlogRoomEntity, chatlog => chatlog.chatlogUser)
    userChatlogPrivate: ChatlogRoomEntity[];

    @OneToMany(type => ChatlogCommandEntity, chatlog => chatlog.chatlogUser)
    userChatlogCommand: ChatlogCommandEntity[];

    @OneToMany(type => GroupEntity, group => group.groupUser)
    userGroups: GroupEntity[];

    @OneToMany(type => GroupMemberEntity, member => member.membershipUser)
    userGroupMemberships: GroupMemberEntity[];

    @OneToMany(type => ItemEntity, item => item.itemUser)
    userItems?: ItemEntity[];

    @OneToMany(type => RoomEntity, room => room.roomUser)
    userRooms?: RoomEntity[];

    @OneToMany(type => RoomBanEntity, ban => ban.banUser)
    userRoomBans?: RoomBanEntity[];

    @OneToMany(type => RoomEntryEntity, entry => entry.entryUser)
    userRoomEntries?: RoomEntryEntity[];

    @OneToMany(type => RoomMuteEntity, mute => mute.muteUser)
    userRoomMutes?: RoomMuteEntity[];
}