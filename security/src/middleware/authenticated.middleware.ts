import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthenticatedMiddleware implements NestMiddleware
{
    resolve(check: boolean): MiddlewareFunction
    {
        return (req: any, res: any, next: any) =>
        {
            if(check && req.user || !check && !req.user) return next();

            throw new HttpException('invalidSession', HttpStatus.UNAUTHORIZED);
        }
    }
}