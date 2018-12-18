import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';

import { SessionService } from '../services';

@Injectable()
export class LoadUserMiddleware implements NestMiddleware
{
    constructor(private readonly sessionService: SessionService) {}

    resolve(): MiddlewareFunction
    {
        return (req: any, res: any, next: any) =>
        {
            const token = req.headers.authorization ? req.headers.authorization.toString().replace('Bearer ', '') : null;
            
            if(!token) return next();
            
            const payload = this.sessionService.validateToken(token);
            
            if(!payload) throw new HttpException('invalid_token', HttpStatus.BAD_REQUEST);
            
            req.user = payload;
            
            return next();
        }
    }
}