import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BanEntity } from './entities';
import { BanService } from './services';

@Module({
    imports: [ TypeOrmModule.forFeature([ BanEntity ]) ],
    exports: [ BanService ],
    providers: [ BanService ]
})
export class ModerationModule {}