import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogService } from '@habboapi/common';

import { ApiPermissionEntity } from '../entities/apiPermission.entity';

import { IApiPermission } from '../interfaces';

@Injectable()
export class PermissionService implements OnModuleInit
{
    private permissionList: Array<IApiPermission>;

    constructor(
        private readonly logService: LogService,
        @InjectRepository(ApiPermissionEntity)
        private readonly apiPermissionRepository: Repository<ApiPermissionEntity>) {}

    async onModuleInit()
    {
        try
        {
            await this.loadPermissions();
        }

        catch(err)
        {
            if(err.code == 'ER_NO_SUCH_TABLE') this.logService.error(`${err.message}. Permissions have not been loaded.`, err.stack, 'PermissionService');

            else if(err.message == 'invalid_permission') this.logService.error(`No permissions have been set, authentication will be unavailable.`, err.stack, 'PermissionService');

            else this.logService.error(err.message, err.stack, 'PermissionService');
        }
    }

    async loadPermissions(): Promise<boolean>
    {
        this.permissionList = [];

        const results = await this.apiPermissionRepository.find();

        if(!results.length) throw new Error('invalid_permission')

        await results.forEach(async result => this.permissionList.push(result));

        this.logService.log(`Loaded ${this.permissionList.length} permission groups`, 'PermissionService');

        return true;
    }

    getPermissions(rankId: number): IApiPermission
    {
        const permissions = this.permissionList.find(rank => rank.id == rankId);

        if(!permissions) return null;

        return permissions;
    }
}