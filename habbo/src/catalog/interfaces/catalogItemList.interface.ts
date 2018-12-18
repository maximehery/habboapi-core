import { ICatalogItem } from './catalogItem.interface';

export interface ICatalogItemList
{
    data: ICatalogItem[],
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}