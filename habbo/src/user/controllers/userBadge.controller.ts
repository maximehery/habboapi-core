import { Controller, UseGuards, Put, Delete, Body, HttpStatus, HttpCode, HttpException } from '@nestjs/common';

import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { UserBadgeService } from '../services';

@Controller('badge')
@UseGuards(PermissionGuard)
export class UserBadgeController
{
    constructor(private readonly userBadgeService: UserBadgeService) {}

    @Put()
    @HttpCode(HttpStatus.OK)
    @Permission('userBadgePut')
    async giveBadge(@Body() body): Promise<null>
    {
        try
        {
            if(!body.userIds || !body.badgeCodes) throw new Error('invalid_parameters');

            await this.userBadgeService.giveBadge(body.userIds, body.badgeCodes);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete()
    @HttpCode(HttpStatus.OK)
    @Permission('userBadgeDelete')
    async remove(@Body() body): Promise<null>
    {
        try
        {
            if(!body.userIds || !body.badgeCodes) throw new Error('invalid_parameters');

            await this.userBadgeService.removeBadge(body.userIds, body.badgeCodes);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}