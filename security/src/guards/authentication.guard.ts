import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticationGuard implements CanActivate
{
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean
    {
        const authenticationRequired = this.reflector.get<boolean>('authenticationRequired', context.getHandler());

        if(authenticationRequired == null) return true;

        const req: any = context.switchToHttp().getRequest();

        if(!authenticationRequired && req.user) throw new HttpException('valid_session', HttpStatus.UNAUTHORIZED);

        if(authenticationRequired && !req.user) throw new HttpException('invalid_session', HttpStatus.UNAUTHORIZED);

        return true;
    }
}