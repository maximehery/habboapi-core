import { ICatalogPage } from './catalogPage.interface';

export interface ICatalogPageList
{
    items: Array<ICatalogPage>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}