import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { RouterModule } from 'nest-router';

import { CommonModule } from '@habboapi/common';
import { EmulatorModule } from '@habboapi/emulator';
import { HabboModule } from '@habboapi/habbo';
import { SecurityModule, LoadUserMiddleware, LoadPermissionsMiddleware, AuthenticatedMiddleware } from '@habboapi/security';

import { AppController } from './habboapi.controller';

import { routes } from './habboapi.routes';

import { Config } from './config/config';

console.log();
console.log(` 888    888          888      888                     d8888 8888888b. 8888888 `);
console.log(` 888    888          888      888                    d88888 888   Y88b  888   `);
console.log(` 888    888          888      888                   d88P888 888    888  888   `);
console.log(` 8888888888  8888b.  88888b.  88888b.   .d88b.     d88P 888 888   d88P  888   `);
console.log(` 888    888     "88b 888 "88b 888 "88b d88""88b   d88P  888 8888888P"   888   `);
console.log(` 888    888 .d888888 888  888 888  888 888  888  d88P   888 888         888   `);
console.log(` 888    888 888  888 888 d88P 888 d88P Y88..88P d8888888888 888         888   `);
console.log(` 888    888 "Y888888 88888P"  88888P"   "Y88P" d88P     888 888       8888888 `);
console.log(` @habboapi/server | v${process.env.npm_package_version} | by Billsonnn`);
console.log();

@Module({
    imports: [
        RouterModule.forRoutes(routes),
        CommonModule.forRoot(Config),
        EmulatorModule,
        HabboModule,
        SecurityModule
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