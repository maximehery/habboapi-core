import { GroupEntity } from './group.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class GroupMemberEntity {
    id: number;
    groupId: number;
    userId: number;
    levelId: number;
    memberSince: number;
    membershipGroup?: GroupEntity;
    membershipUser?: UserEntity;
}
