import { IItemBase } from './itemBase.interface';

export interface IItemBaseList
{
    data: Array<IItemBase>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}