import { IChatlogRoom } from './chatlogRoom.interface'

export interface IChatlogRoomList
{
    items: Array<IChatlogRoom>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}