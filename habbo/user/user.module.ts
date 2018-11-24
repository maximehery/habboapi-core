import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController, UserBadgeController, UserValidatorsController } from './controllers';
import { UserEntity, UserBadgeEntity, UserCurrencyEntity, UserFavoriteRoomEntity } from './entities';
import { UserService, UserBadgeService, UserCurrencyService, UserValidatorService } from './services';

@Module({
    imports: [ TypeOrmModule.forFeature([ UserEntity, UserBadgeEntity, UserCurrencyEntity, UserFavoriteRoomEntity ]) ],
    controllers: [ UserController, UserBadgeController, UserValidatorsController ],
    exports: [ UserService, UserBadgeService, UserCurrencyService, UserValidatorService ],
    providers: [ UserService, UserBadgeService, UserCurrencyService, UserValidatorService]
})
export class UserModule {}