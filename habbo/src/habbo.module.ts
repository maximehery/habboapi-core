import { Module, Global, OnModuleInit } from '@nestjs/common';

import { LogService } from '@habboapi/common';

import { CatalogModule } from './catalog';
import { ChatlogModule } from './chatlog';
import { GroupModule } from './group';
import { ItemModule } from './item';
import { ModerationModule } from './moderation';
import { RoomModule } from './room';
import { SystemModule } from './system';
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
        SystemModule,
        UserModule
    ]
})
export class HabboModule implements OnModuleInit
{
    onModuleInit()
    {
        const packageInfo = require(__dirname + '/package.json');

        LogService.log(`${ packageInfo.name }@${ packageInfo.version } initialized`, 'HabboModule');
    }
}