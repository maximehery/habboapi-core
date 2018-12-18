import { IUser } from '../../user';
import { IRoom } from '../../room';

export interface ISystemSearch
{
    users?: IUser[];
    rooms?: IRoom[];
}