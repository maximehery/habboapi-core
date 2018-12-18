import { Global, Module, OnModuleInit } from '@nestjs/common';

import { LogService } from '@habboapi/common';

import { EmulatorService, RconService } from './services';

@Global()
@Module({
    providers: [
        EmulatorService,
        RconService
    ],
    exports: [
        EmulatorService,
        RconService
    ]
})
export class EmulatorModule implements OnModuleInit
{
    onModuleInit()
    {
        const packageInfo = require(__dirname + '/package.json');
        
        LogService.log(`${ packageInfo.name }@${ packageInfo.version } initialized`, 'EmulatorModule');
    }
}