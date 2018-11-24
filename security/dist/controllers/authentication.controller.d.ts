import { AuthenticationService } from '../services/authentication.service';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    login(body: any): Promise<{
        sessionToken: string;
    }>;
}
