import { IGroupMember } from './groupMember.interface';

export interface IGroupMemberList
{
    items: Array<IGroupMember>,
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}