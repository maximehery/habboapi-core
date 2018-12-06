import { IChatlogPrivate } from './chatlogPrivate.interface';

export interface IChatlogPrivateList
{
    data: Array<IChatlogPrivate>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}