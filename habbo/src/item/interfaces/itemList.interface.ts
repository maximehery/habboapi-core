import { IItem } from './item.interface';

export interface IItemList
{
    items: Array<IItem>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}