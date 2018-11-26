import { IGroup } from './group.interface';

export interface IGroupList
{
    items: Array<IGroup>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}