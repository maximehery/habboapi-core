import { SessionService } from './session.service';
export declare class AuthenticationService {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    login(username: string, password: string): Promise<string>;
}
