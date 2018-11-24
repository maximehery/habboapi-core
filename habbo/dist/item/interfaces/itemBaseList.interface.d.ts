import { IItemBase } from './itemBase.interface';
export interface IItemBaseList {
    items: Array<IItemBase>;
    pagination: {
        currentPage: number;
        nextPage: number;
        previousPage: number;
        totalPages: number;
        totalItems: number;
    };
}
