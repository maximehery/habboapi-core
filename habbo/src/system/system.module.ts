import { Module, Global } from '@nestjs/common';

import { StatisticsController } from './controllers';
import { StatisticsService } from './services';

@Global()
@Module({
    controllers: [ StatisticsController ],
    providers: [ StatisticsService ],
    exports: [ StatisticsService ]
})
export class SystemModule {}