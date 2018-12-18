import { Module, Global, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogService } from '@habboapi/common';

import { AuthenticationController } from './controllers';
import { ApiPermissionEntity } from './entities';
import { SessionInterceptor } from './interceptors';
import { AuthenticationService, PermissionService, SessionService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            ApiPermissionEntity
        ])
    ],
    controllers: [
        AuthenticationController
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: SessionInterceptor
        },
        AuthenticationService,
        PermissionService,
        SessionService
    ],
    exports: [
        AuthenticationService,
        PermissionService,
        SessionService
    ]
})
export class SecurityModule implements OnModuleInit
{
    onModuleInit()
    {
        const packageInfo = require(__dirname + '/package.json');

        LogService.log(`${ packageInfo.name }@${ packageInfo.version } initialized`, 'SecurityModule');
    }
}