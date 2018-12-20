import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Authentication, Permission } from '@habboapi/security/decorators';
import { AuthenticationGuard } from '@habboapi/security/guards/authentication.guard';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { IGroup, IGroupList } from '../interfaces';
import { GroupService } from '../services';

@Controller()
@UseGuards(AuthenticationGuard, PermissionGuard)
export class GroupController
{
    constructor(private readonly groupService: GroupService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('group')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IGroupList>
    {
        try
        {
            const result = await this.groupService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('random')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('group')
    async random(): Promise<{ data: IGroup[] }>
    {
        try
        {
            const result = await this.groupService.getRandom();

            if(!result) throw new Error('no_results');

            return { data: result };
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':groupId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('group')
    async getOne(@Param() params: { groupId: number, relations?: string }): Promise<IGroup>
    {
        try
        {
            const result = await this.groupService.getOne(params.groupId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('group')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IGroupList>
    {
        try
        {
            const result = await this.groupService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}