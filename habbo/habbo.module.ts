import { Module, Global, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthenticatedMiddleware } from '../security/middleware/authenticated.middleware';

import { CatalogModule } from './catalog';
import { ChatlogModule } from './chatlog';
import { GroupModule } from './group';
import { ItemModule } from './item';
import { ModerationModule } from './moderation';
import { RoomModule } from './room';
import { UserModule } from './user';

@Global()
@Module({
    imports: [
        CatalogModule,
        ChatlogModule,
        GroupModule,
        ItemModule,
        ModerationModule,
        RoomModule,
        UserModule
    ]
})
export class HabboModule implements NestModule
{
    configure(consumer: MiddlewareConsumer)
    {
        consumer
            .apply(AuthenticatedMiddleware)
            .with(true)
            .forRoutes({ path: '/habbo', method: RequestMethod.ALL });
    }
}