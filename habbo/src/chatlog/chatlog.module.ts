import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChatlogPrivateController, ChatlogRoomController } from './controllers';
import { ChatlogCommandEntity, ChatlogPrivateEntity, ChatlogRoomEntity } from './entities';
import { ChatlogPrivateService, ChatlogRoomService } from './services';

@Global()
@Module({
    imports: [ TypeOrmModule.forFeature([ ChatlogCommandEntity, ChatlogPrivateEntity, ChatlogRoomEntity ]) ],
    controllers: [ ChatlogPrivateController, ChatlogRoomController ],
    exports: [ ChatlogPrivateService, ChatlogRoomService ],
    providers: [ ChatlogPrivateService, ChatlogRoomService ]
})
export class ChatlogModule {}