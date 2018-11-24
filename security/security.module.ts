import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthenticationController, SessionController } from './controllers';
import { ApiPermissionEntity } from './entities';
import { AuthenticationService, PermissionService, SessionService } from './services';

import { AuthenticatedMiddleware } from './middleware/authenticated.middleware';

@Global()
@Module({
    imports: [ TypeOrmModule.forFeature([ ApiPermissionEntity ]) ],
    controllers: [ AuthenticationController, SessionController ],
    exports: [ AuthenticationService, PermissionService, SessionService ],
    providers: [ AuthenticationService, PermissionService, SessionService ]
})
export class SecurityModule implements NestModule
{
    configure(consumer: MiddlewareConsumer)
    {
        consumer
            .apply(AuthenticatedMiddleware)
            .with(true)
            .forRoutes({ path: '/security/session', method: RequestMethod.ALL });
    }
}