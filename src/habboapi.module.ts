import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { CommonModule } from '@habboapi/common';
import { EmulatorModule } from '@habboapi/emulator';
import { HabboModule } from '@habboapi/habbo';
import { SecurityModule, LoadUserMiddleware, LoadPermissionsMiddleware, AuthenticatedMiddleware } from '@habboapi/security';
import { RealtimeModule } from '@habboapi/realtime';

import { PluginsModule } from './plugins/plugins.module';

import { AppController } from './habboapi.controller';

import { routes } from './habboapi.routes';

import { Config } from './config/config';

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        CommonModule.forRoot(Config),
        EmulatorModule,
        HabboModule,
        SecurityModule,
        RealtimeModule,
        PluginsModule
    ],
    controllers: [ AppController ]
})
export class HabboAPI implements NestModule
{
    configure(consumer: MiddlewareConsumer)
    {
        consumer
            .apply(LoadUserMiddleware, LoadPermissionsMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
            .apply(AuthenticatedMiddleware)
            .with(true)
            .forRoutes(
                { path: '/habbo', method: RequestMethod.ALL },
                { path: '/security/session', method: RequestMethod.ALL });
    }
}