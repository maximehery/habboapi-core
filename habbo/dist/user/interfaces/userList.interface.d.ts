import { IUser } from './user.interface';
export interface IUserList {
    items: Array<IUser>;
    pagination: {
        currentPage: number;
        nextPage: number;
        previousPage: number;
        totalPages: number;
        totalItems: number;
    };
}
