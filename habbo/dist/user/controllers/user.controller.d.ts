import { UserService } from '../services/user.service';
import { IUser, IUserList } from '../interfaces';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(params: any): Promise<IUserList>;
    getOne(params: any): Promise<IUser>;
    searchAll(body: any): Promise<IUserList>;
}
