import { IApiPermission } from './apiPermission.interface';

export interface ISession
{
    sessionToken?: string;
    id?: number;
    username?: string;
    look?: string;
    rank?: number;
    permissions?: IApiPermission;
}