import { NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
export declare class LoadPermissionsMiddleware implements NestMiddleware {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    resolve(): MiddlewareFunction;
}
