import { IUser } from './user.interface';

export interface IUserList
{
    data: IUser[],
    pagination: {
        currentPage: number,
        nextPage: number,
        previousPage: number,
        totalPages: number,
        totalItems: number
    }
}