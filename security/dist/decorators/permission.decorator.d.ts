import { IPermission } from '../interfaces/permissions.type';
export declare const Permission: (...permissions: IPermission[]) => (target: object, key?: any, descriptor?: any) => any;
