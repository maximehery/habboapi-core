import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemController, ItemBaseController } from './controllers';
import { ItemEntity, ItemBaseEntity } from './entities';
import { ItemService, ItemBaseService } from './services';

@Module({
    imports: [ TypeOrmModule.forFeature([ ItemEntity, ItemBaseEntity ]) ],
    controllers: [ ItemController, ItemBaseController ],
    exports: [ ItemService, ItemBaseService ],
    providers: [ ItemService, ItemBaseService ]
})
export class ItemModule {}