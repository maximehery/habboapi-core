import { UserEntity } from './user.entity';
export declare class UserBadgeEntity {
    id: number;
    userId: number;
    slotId: number;
    badgeCode: string;
    badgeUser?: UserEntity;
}
