import { Controller, Put, Delete, Body, Res, HttpStatus, HttpException } from '@nestjs/common';

import { UserBadgeService } from '../services/userBadge.service';

@Controller('badge')
export class UserBadgeController
{
    constructor(private readonly userBadgeService: UserBadgeService) {}

    @Put()
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