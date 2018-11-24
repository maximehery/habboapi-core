import { RoomEntity } from './room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class RoomBanEntity {
    id: number;
    roomId: number;
    userId: number;
    ends: number;
    banRoom?: RoomEntity;
    banUser?: UserEntity;
}
