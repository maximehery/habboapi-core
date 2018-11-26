import { Injectable, NestMiddleware, MiddlewareFunction, HttpException, HttpStatus } from '@nestjs/common';

import { PermissionService } from '../services/permission.service';

@Injectable()
export class LoadPermissionsMiddleware implements NestMiddleware
{
    constructor(private readonly permissionService: PermissionService) {}

    resolve(): MiddlewareFunction
    {
        return (req: any, res: any, next: any) =>
        {   
            if(req.user && req.user.rank)
            {
                req.user.permissions = null;

                const permissions = this.permissionService.getPermissions(req.user.rank);

                if(!permissions) throw new HttpException('invalidPermissions', HttpStatus.BAD_REQUEST);

                req.user.permissions = permissions;
            }

            return next();
        }
    }
}