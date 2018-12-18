import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatalogItemController, CatalogPageController } from './controllers';
import { CatalogItemEntity, CatalogItemLimitedEntity, CatalogPageEntity } from './entities';
import { CatalogItemService, CatalogPageService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            CatalogItemEntity,
            CatalogItemLimitedEntity,
            CatalogPageEntity
        ])
    ],
    controllers: [
        CatalogItemController,
        CatalogPageController
    ],
    exports: [
        CatalogItemService,
        CatalogPageService
    ],
    providers: [
        CatalogItemService,
        CatalogPageService ]
})
export class CatalogModule {}