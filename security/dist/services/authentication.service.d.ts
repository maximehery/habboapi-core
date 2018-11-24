import { UserService } from '@habboapi/habbo';
import { SessionService } from './session.service';
export declare class AuthenticationService {
    private readonly userService;
    private readonly sessionService;
    constructor(userService: UserService, sessionService: SessionService);
    login(username: string, password: string): Promise<string>;
}
