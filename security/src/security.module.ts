import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController, SessionController } from './controllers';
import { ApiPermissionEntity } from './entities';
import { AuthenticationService, PermissionService, SessionService } from './services';

@Global()
@Module({
    imports: [ TypeOrmModule.forFeature([ ApiPermissionEntity ]) ],
    controllers: [ AuthenticationController, SessionController ],
    exports: [ AuthenticationService, PermissionService, SessionService ],
    providers: [ AuthenticationService, PermissionService, SessionService ]
})
export class SecurityModule
{
    constructor()
    {
        console.log(` [INITIALIZING] @habboapi/security@${process.env.npm_package_version}`);
    }
}