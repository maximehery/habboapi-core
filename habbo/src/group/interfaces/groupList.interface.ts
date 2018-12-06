import { IGroup } from './group.interface';

export interface IGroupList
{
    data: Array<IGroup>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}