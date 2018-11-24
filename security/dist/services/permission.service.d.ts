import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LogService } from '@habboapi/common';
import { ApiPermissionEntity } from '../entities/apiPermission.entity';
import { IApiPermission } from '../interfaces';
export declare class PermissionService implements OnModuleInit {
    private readonly logService;
    private readonly apiPermissionRepository;
    permissionList: Array<IApiPermission>;
    constructor(logService: LogService, apiPermissionRepository: Repository<ApiPermissionEntity>);
    onModuleInit(): Promise<void>;
    loadPermissions(): Promise<boolean>;
    getPermissions(rankId: number): IApiPermission;
}
