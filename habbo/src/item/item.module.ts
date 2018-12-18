import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ItemController, ItemBaseController } from './controllers';
import { ItemEntity, ItemBaseEntity } from './entities';
import { ItemService, ItemBaseService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            ItemEntity,
            ItemBaseEntity
        ])
    ],
    controllers: [
        ItemBaseController,
        ItemController
    ],
    exports: [
        ItemService,
        ItemBaseService
    ],
    providers: [
        ItemService,
        ItemBaseService
    ]
})
export class ItemModule {}