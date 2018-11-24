import { UserValidatorService } from '../services/userValidator.service';
export declare class UserValidatorsController {
    private readonly userValidatorService;
    constructor(userValidatorService: UserValidatorService);
    validateUsername(params: any): Promise<any>;
    validateEmail(params: any): Promise<any>;
}
