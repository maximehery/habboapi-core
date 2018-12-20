import { Controller, UseGuards, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Authentication, Permission } from '@habboapi/security/decorators';
import { AuthenticationGuard } from '@habboapi/security/guards/authentication.guard';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { ISystemStatistics } from '../interfaces';
import { StatisticsService } from '../services';

@Controller()
@UseGuards(AuthenticationGuard, PermissionGuard)
export class StatisticsController
{
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('statistics')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('systemStatistics')
    statistics(): ISystemStatistics
    {
        return this.statisticsService.systemStatistics;
    }
}