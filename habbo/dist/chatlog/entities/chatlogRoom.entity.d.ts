import { RoomEntity } from '../../room/entities/room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class ChatlogRoomEntity {
    id: number;
    roomId: number;
    userFromId: number;
    userToId: number;
    message: string;
    timestamp: number;
    chatlogRoom?: RoomEntity;
    chatlogUser?: UserEntity;
    chatlogReciever?: UserEntity;
}
