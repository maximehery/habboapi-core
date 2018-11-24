import { UserEntity } from './user.entity';
export declare class UserFavoriteRoomEntity {
    id: number;
    userId: number;
    type: number;
    favoriteUser?: UserEntity;
}
