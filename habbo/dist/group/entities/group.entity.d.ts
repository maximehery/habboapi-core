import { GroupMemberEntity } from './groupMember.entity';
import { ItemEntity } from '../../item/entities/item.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class GroupEntity {
    id: number;
    userId: number;
    name: string;
    description: string;
    roomId: number;
    state: number;
    rights: '0' | '1';
    colorOne: number;
    colorTwo: number;
    badge: string;
    dateCreated: number;
    forum: '0' | '1';
    readForum: 'EVERYONE' | 'MEMBERS' | 'ADMINS';
    postMessages: 'EVERYONE' | 'MEMBERS' | 'ADMINS' | 'OWNER';
    postThreads: 'EVERYONE' | 'MEMBERS' | 'ADMINS' | 'OWNER';
    modForum: 'ADMINS' | 'OWNER';
    groupMembers?: GroupMemberEntity[];
    groupItems?: ItemEntity[];
    groupRoom?: RoomEntity;
    groupUser?: UserEntity;
}
