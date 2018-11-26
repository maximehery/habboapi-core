import { Module, Global } from '@nestjs/common';

import { EmulatorService, RconService } from './services';

@Global()
@Module({
    providers: [ EmulatorService, RconService ],
    exports: [ EmulatorService, RconService ]
})
export class EmulatorModule
{
    constructor()
    {
        console.log(` [INITIALIZING] @habboapi/emulator@${process.env.npm_package_version}`);
    }
}