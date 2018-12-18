import { Module, OnModuleInit } from '@nestjs/common';

import { LogService } from '@habboapi/common';

import { EventsGateway } from './gateway';

import { SocketService } from './services';

@Module({
    providers: [
        EventsGateway,
        SocketService
    ]
})
export class RealtimeModule implements OnModuleInit
{
    onModuleInit()
    {
        const packageInfo = require(__dirname + '/package.json');

        LogService.log(`${ packageInfo.name }@${ packageInfo.version } initialized`, 'RealtimeModule');
    }
}