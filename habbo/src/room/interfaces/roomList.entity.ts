import { IRoom } from './room.interface';

export interface IRoomList
{
    data: IRoom[],
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}