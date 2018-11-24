import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
export declare class UserValidatorService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validateUsername(username: string): Promise<boolean>;
    validateEmail(email: string): Promise<boolean>;
}
