import { IItem } from './item.interface';

export interface IItemList
{
    data: Array<IItem>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}