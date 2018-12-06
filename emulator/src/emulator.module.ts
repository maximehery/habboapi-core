import { Global, Module } from '@nestjs/common';

import { LogService } from '@habboapi/common';

import { EmulatorService, RconService } from './services';

const packageInfo = require(__dirname + '/package.json');

LogService.log(`Initializing ${packageInfo.name}@${packageInfo.version}`, 'EmulatorModule');

@Global()
@Module({
    providers: [ EmulatorService, RconService ],
    exports: [ EmulatorService, RconService ]
})
export class EmulatorModule {}