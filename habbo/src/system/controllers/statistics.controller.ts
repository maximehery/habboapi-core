import { Controller, UseGuards, Get, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { ISystemStatistics } from '../interfaces';
import { StatisticsService } from '../services';

@Controller()
@UseGuards(PermissionGuard)
export class StatisticsController
{
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('statistics')
    @HttpCode(HttpStatus.OK)
    @Permission('systemStatistics')
    statistics(): ISystemStatistics
    {
        return this.statisticsService.systemStatistics;
    }
}