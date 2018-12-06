import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BanEntity } from './entities';
import { BanService } from './services';

@Global()
@Module({
    imports: [ TypeOrmModule.forFeature([ BanEntity ]) ],
    exports: [ BanService ],
    providers: [ BanService ]
})
export class ModerationModule {}