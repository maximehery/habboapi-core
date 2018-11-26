import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupController, GroupMemberController } from './controllers';
import { GroupEntity, GroupMemberEntity } from './entities';
import { GroupService, GroupMemberService } from './services';

@Module({
    imports: [ TypeOrmModule.forFeature([ GroupEntity, GroupMemberEntity]) ],
    controllers: [ GroupController, GroupMemberController ],
    exports: [ GroupService, GroupMemberService ],
    providers: [ GroupService, GroupMemberService ]
})
export class GroupModule {}