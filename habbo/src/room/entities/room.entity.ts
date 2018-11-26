import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

import { RoomBanEntity } from './roomBan.entity';
import { RoomEntryEntity } from './roomEntry.entity';
import { RoomModelEntity } from './roomModel.entity';
import { RoomMuteEntity } from './roomMute.entity';

import { ChatlogRoomEntity } from '../../chatlog/entities/chatlogRoom.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('rooms')
export class RoomEntity
{
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'owner_id' })
    ownerId: number;

    @Column({ name: 'owner_name', select: false })
    ownerName: string;

    @Column({ name: 'name' })
    name: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'model' })
    model: string;

    @Column({ name: 'password', select: false })
    password: string;

    @Column({ name: 'state', type: 'enum', enum: ['open', 'locked', 'password', 'invisible'], select: false })
    state: 'open' | 'locked' | 'password' | 'invisible';

    @Column({ name: 'users' })
    users: number;

    @Column({ name: 'users_max' })
    usersMax: number;

    @Column({ name: 'guild_id' })
    guildId: number;

    @Column({ name: 'category'})
    category: number;

    @Column({ name: 'score' })
    score: number;

    @Column({ name: 'paper_floor', select: false })
    paperFloor: string;

    @Column({ name: 'paper_wall', select: false })
    paperWall: string;

    @Column({ name: 'paper_landscape', select: false })
    paperLandscape: string;

    @Column({ name: 'thickness_wall', select: false })
    thicknessWall: number;

    @Column({ name: 'wall_height', select: false })
    wallHeight: number;

    @Column({ name: 'thickness_floor', select: false })
    thicknessFloor: number;

    @Column({ name: 'moodlight_data', select: false })
    moodlightData: string;

    @Column({ name: 'tags', select: false })
    tags: string;

    @Column({ name: 'is_public', type: 'enum', enum: ['0', '1'], select: false })
    isPublic: '0' | '1';

    @Column({ name: 'is_staff_picked', type: 'enum', enum: ['0', '1'], select: false })
    isStaffPicked: '0' | '1';

    @Column({ name: 'allow_other_pets', type: 'enum', enum: ['0', '1'], select: false })
    allow_OtherPets: '0' | '1';

    @Column({ name: 'allow_other_pets_eat', type: 'enum', enum: ['0', '1'], select: false })
    allowOtherPetsEat: '0' | '1';

    @Column({ name: 'allow_walkthrough', type: 'enum', enum: ['0', '1'], select: false })
    allowWalkthrough: '0' | '1';

    @Column({ name: 'allow_hidewall', type: 'enum', enum: ['0', '1'], select: false })
    allowHidewall: '0' | '1';

    @Column({ name: 'chat_mode', select: false })
    chatMode: number;

    @Column({ name: 'chat_weight', select: false })
    chatWeight: number;

    @Column({ name: 'chat_speed', select: false })
    chatSpeed: number;

    @Column({ name: 'chat_hearing_distance', select: false })
    chatHearingDistance: number;

    @Column({ name: 'chat_protection', select: false })
    chatProtection: number;

    @Column({ name: 'override_model', type: 'enum', enum: ['0', '1'], select: false })
    overrideModel: '0' | '1';

    @Column({ name: 'who_can_mute', select: false })
    whoCanMute: number;

    @Column({ name: 'who_can_kick', select: false })
    whoCanKick: number;

    @Column({ name: 'who_can_ban', select: false })
    whoCanBan: number;

    @Column({ name: 'poll_id', select: false })
    pollId: number;

    @Column({ name: 'roller_speed', select: false })
    rollerSpeed: number;

    @Column({ name: 'promoted', type: 'enum', enum: ['0', '1'], select: false })
    promoted: '0' | '1';

    @Column({ name: 'trade_mode', select: false })
    tradeMode: number;

    @Column({ name: 'move_diagonally', type: 'enum', enum: ['0', '1'], select: false })
    moveDiagonally: '0' | '1';

    @Column({ name: 'jukebox_active', type: 'enum', enum: ['0', '1'], select: false })
    jukeboxActive: '0' | '1';

    @Column({ name: 'hidewired', type: 'enum', enum: ['0', '1'], select: false })
    hideWired: '0' | '1';

    @OneToMany(type => ChatlogRoomEntity, chatlog => chatlog.chatlogRoom)
    roomChatlog?: ChatlogRoomEntity[];

    @OneToOne(type => GroupEntity)
    @JoinColumn({ name: 'guild_id'})
    roomGroup?: GroupEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({ name: 'owner_id'})
    roomUser?: UserEntity;

    @OneToMany(type => RoomBanEntity, ban => ban.banRoom)
    roomBans?: RoomBanEntity[];

    @OneToMany(type => RoomEntryEntity, entry => entry.entryRoom)
    roomEntries: RoomEntryEntity[];

    @OneToOne(type => RoomModelEntity)
    @JoinColumn({ name: 'model'})
    roomModelDefinition: RoomModelEntity;

    @OneToMany(type => RoomMuteEntity, mute => mute.muteRoom)
    roomMutes: RoomMuteEntity[];
}