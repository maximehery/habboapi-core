import { IGroup } from './group.interface';

export interface IGroupList
{
    data: IGroup[],
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}