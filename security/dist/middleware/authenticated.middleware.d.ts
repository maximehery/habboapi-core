import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export declare class AuthenticatedMiddleware implements NestMiddleware {
    resolve(check: boolean): MiddlewareFunction;
}
