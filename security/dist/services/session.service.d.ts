import { ConfigService } from '@habboapi/common';
import { ISession } from '../interfaces';
export declare class SessionService {
    private readonly configService;
    constructor(configService: ConfigService);
    createToken(payload: ISession): string;
    validateToken(token: string): ISession;
}
