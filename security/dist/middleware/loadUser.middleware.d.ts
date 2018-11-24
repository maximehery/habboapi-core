import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { SessionService } from '../services/session.service';
export declare class LoadUserMiddleware implements NestMiddleware {
    private readonly sessionService;
    constructor(sessionService: SessionService);
    resolve(): MiddlewareFunction;
}
