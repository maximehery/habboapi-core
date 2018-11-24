import { RoomEntity } from './room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class RoomEntryEntity {
    id: number;
    roomId: number;
    userId: number;
    timestamp: number;
    exitTimestamp: number;
    entryRoom?: RoomEntity;
    entryUser?: UserEntity;
}
