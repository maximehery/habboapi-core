import { ItemBaseEntity } from './itemBase.entity';
import { GroupEntity } from '../../group/entities/group.entity';
import { RoomEntity } from '../../room/entities/room.entity';
import { UserEntity } from '../../user/entities/user.entity';
export declare class ItemEntity {
    id: number;
    userId: number;
    roomId: number;
    itemId: number;
    wallPos: number;
    x: number;
    y: number;
    z: number;
    rot: number;
    extraData: string;
    wiredData: string;
    limitedData: string;
    groupId: number;
    itemBase?: ItemBaseEntity;
    itemGroup?: GroupEntity;
    itemRoom?: RoomEntity;
    itemUser?: UserEntity;
}
