import { IBan } from './ban.interface';

export interface IBanList
{
    data: Array<IBan>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}