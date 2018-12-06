import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate
{
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean
    {
        const permissions = this.reflector.get<string[]>('permissions', context.getHandler());

        if(!permissions) return true;

        const req: any = context.switchToHttp().getRequest();

        if(!req.user) throw new HttpException('invalid_session', HttpStatus.UNAUTHORIZED);

        permissions.forEach(permission =>
        {
            if(!req.user.permissions[permission] || req.user.permissions[permission] == '0') throw new HttpException('invalid_permission', HttpStatus.UNAUTHORIZED);
        });

        return true;
    }
}