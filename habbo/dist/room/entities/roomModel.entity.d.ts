import { RoomEntity } from './room.entity';
export declare class RoomModelEntity {
    id: number;
    name: string;
    doorX: number;
    doorY: number;
    doorDir: number;
    heightmap: string;
    publicItems: string;
    clubOnly: '0' | '1';
    modelRooms?: RoomEntity[];
}
