import { IRoom } from './room.interface';
export interface IRoomList {
    items: Array<IRoom>;
    pagination: {
        currentPage: number;
        nextPage: number;
        previousPage: number;
        totalPages: number;
        totalItems: number;
    };
}
