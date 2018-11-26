import { Module, Global } from '@nestjs/common';

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
export class HabboModule
{
    constructor()
    {
        console.log(` [INITIALIZING] @habboapi/habbo@${process.env.npm_package_version}`);
    }
}