import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogService } from '@habboapi/common';

import { ApiPermissionEntity } from '../entities/apiPermission.entity';

import { IApiPermission } from '../interfaces';

@Injectable()
export class PermissionService implements OnModuleInit
{
    permissionList: Array<IApiPermission>;

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
            if(err.message == 'noPermissions') this.logService.error(`No permissions have been set, authentication will be unavailable`, err.stack, 'ApiPermissionService');

            else this.logService.error(err.message, err.stack, 'PermissionService');
        }
    }

    async loadPermissions(): Promise<boolean>
    {
        this.permissionList = [];

        const results = await this.apiPermissionRepository.find();

        if(!results.length) return Promise.reject('noPermissions');

        await results.forEach(async result => this.permissionList.push(result));

        this.logService.success(`Loaded ${this.permissionList.length} permission groups`, 'PermissionService');

        return Promise.resolve(true);
    }

    getPermissions(rankId: number): IApiPermission
    {
        const permissions = this.permissionList.find(rank => rank.id == rankId);

        if(!permissions) return null;

        return permissions;
    }
}