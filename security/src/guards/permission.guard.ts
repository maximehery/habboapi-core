import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { IPermission } from '../interfaces';

@Injectable()
export class PermissionGuard implements CanActivate
{
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean
    {
        const permissions = this.reflector.get<IPermission[]>('permissions', context.getHandler());

        if(!permissions) return true;

        const req: any = context.switchToHttp().getRequest();

        if(!req.user) throw new HttpException('invalidSession', HttpStatus.UNAUTHORIZED);

        permissions.forEach(permission =>
        {
            if(!req.user.permissions[permission] || req.user.permissions[permission] == '0') throw new HttpException('invalidPermission', HttpStatus.UNAUTHORIZED);
        });

        return true;
    }
}