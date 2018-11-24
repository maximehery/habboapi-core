import { RoomEntity } from './room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class RoomMuteEntity {
    id: number;
    roomId: number;
    userId: number;
    ends: number;
    muteRoom?: RoomEntity;
    muteUser?: UserEntity;
}
