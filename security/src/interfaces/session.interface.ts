import { IApiPermission } from './permission.interface';

export interface ISession
{
    id?: number;
    username?: string;
    look?: string;
    rank?: number;
    permissions?: IApiPermission;
}