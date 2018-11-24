import { Repository } from 'typeorm';
import { UserValidatorService } from './userValidator.service';
import { UserEntity } from '../entities/user.entity';
import { ISearchOptions } from '@habboapi/common';
import { IUser, IUserList } from '../interfaces';
export declare class UserService {
    private readonly userValidatorService;
    private readonly userRepository;
    constructor(userValidatorService: UserValidatorService, userRepository: Repository<UserEntity>);
    getAll(searchOptions?: ISearchOptions): Promise<IUserList>;
    getOne(itemId: number, relations?: Array<string>): Promise<IUser>;
    login(username: string): Promise<{
        id: number;
        username: string;
        password: string;
        look: string;
        rank: number;
    }>;
}
