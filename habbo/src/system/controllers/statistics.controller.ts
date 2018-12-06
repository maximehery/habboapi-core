import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators/permission.decorator';

import { StatisticsService } from '../services/statistics.service';

@Controller()
@UseGuards(PermissionGuard)
export class StatisticsController
{
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('statistics')
    @HttpCode(HttpStatus.OK)
    //@Permission('systemStatistics')
    async statistics()
    {
        try
        {
            return this.statisticsService.systemStatistics;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}