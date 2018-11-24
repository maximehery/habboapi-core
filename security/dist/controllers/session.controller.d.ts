import { AuthenticationService } from '../services/authentication.service';
import { ISession } from '../interfaces';
export declare class SessionController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    get(req: any): Promise<ISession>;
}
