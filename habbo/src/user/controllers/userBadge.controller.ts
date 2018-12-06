import { Controller, UseGuards, Put, Delete, Body, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators/permission.decorator';

import { UserBadgeService } from '../services/userBadge.service';

@Controller('badge')
@UseGuards(PermissionGuard)
export class UserBadgeController
{
    constructor(private readonly userBadgeService: UserBadgeService) {}

    @Put()
    @Permission('userBadgePut')
    async giveBadge(@Body() body): Promise<any>
    {
        try
        {
            if(!body.userIds || !body.badgeCodes) throw new HttpException('invalid_parameters', HttpStatus.BAD_REQUEST);

            await this.userBadgeService.giveBadge(body.userIds, body.badgeCodes);

            return;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete()
    @Permission('userBadgeDelete')
    async remove(@Body() body): Promise<any>
    {
        try
        {
            if(!body.userIds || !body.badgeCodes) throw new HttpException('invalid_parameters', HttpStatus.BAD_REQUEST);

            await this.userBadgeService.removeBadge(body.userIds, body.badgeCodes);

            return;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}