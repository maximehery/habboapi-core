import { Module, Global } from '@nestjs/common';

import { SearchController, StatisticsController } from './controllers';
import { SearchService, StatisticsService } from './services';

@Global()
@Module({
    controllers: [
        SearchController,
        StatisticsController
    ],
    providers: [
        SearchService,
        StatisticsService
    ],
    exports: [
        SearchService,
        StatisticsService
    ]
})
export class SystemModule {}