import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators/permission.decorator';

import { GroupService } from '../services/group.service';
import { IGroup, IGroupList } from '../interfaces';

@Controller()
@UseGuards(PermissionGuard)
export class GroupController
{
    constructor(private readonly groupService: GroupService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('group')
    async getAll(@Param() params): Promise<IGroupList>
    {
        try
        {
            const result = await this.groupService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':groupId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('group')
    async getOne(@Param() params): Promise<IGroup>
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
    @Permission('group')
    async searchAll(@Body() body): Promise<IGroupList>
    {
        try
        {
            const result = await this.groupService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}