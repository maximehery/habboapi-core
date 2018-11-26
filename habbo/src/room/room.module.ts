import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from './controllers';
import { RoomEntity, RoomBanEntity, RoomEntryEntity, RoomModelEntity, RoomMuteEntity } from './entities';
import { RoomService } from './services';

@Module({
    imports: [ TypeOrmModule.forFeature([ RoomEntity, RoomBanEntity, RoomEntryEntity, RoomModelEntity, RoomMuteEntity ]) ],
    controllers: [ RoomController ],
    exports: [ RoomService ],
    providers: [ RoomService ]
})
export class RoomModule {}