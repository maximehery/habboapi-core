import { Module, Global } from '@nestjs/common';

import { EmulatorService, RconService } from './services';

@Global()
@Module({
    providers: [ EmulatorService, RconService ],
    exports: [ EmulatorService, RconService ]
})
export class EmulatorModule {}