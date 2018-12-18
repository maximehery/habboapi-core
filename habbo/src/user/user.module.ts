import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController, UserBadgeController, UserValidatorsController } from './controllers';
import { UserEntity, UserBadgeEntity, UserCurrencyEntity } from './entities';
import { UserService, UserBadgeService, UserCurrencyService, UserValidatorService } from './services';

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
            UserBadgeEntity,
            UserCurrencyEntity
        ])
    ],
    controllers: [
        UserController,
        UserBadgeController,
        UserValidatorsController
    ],
    providers: [
        UserService,
        UserBadgeService,
        UserCurrencyService,
        UserValidatorService
    ],
    exports: [
        UserService,
        UserBadgeService,
        UserCurrencyService,
        UserValidatorService
    ]
})
export class UserModule {}