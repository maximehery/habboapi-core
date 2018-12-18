import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from './controllers';
import { RoomEntity, RoomBanEntity, RoomEntryEntity, RoomMuteEntity } from './entities';
import { RoomService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            RoomEntity,
            RoomBanEntity,
            RoomEntryEntity,
            RoomMuteEntity
        ])
    ],
    controllers: [
        RoomController
    ],
    exports: [
        RoomService
    ],
    providers: [
        RoomService
    ]
})
export class RoomModule {}