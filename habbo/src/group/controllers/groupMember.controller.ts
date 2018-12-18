import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { IGroupMember, IGroupMemberList } from '../interfaces';
import { GroupMemberService } from '../services';

@Controller('member')
@UseGuards(PermissionGuard)
export class GroupMemberController
{
    constructor(private readonly groupMemberService: GroupMemberService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('group')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IGroupMemberList>
    {
        try
        {
            const result = await this.groupMemberService.getAll({
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

    @Get(':groupMembershipId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('group')
    async getOne(@Param() params: { groupMembershipId: number, relations?: string }): Promise<IGroupMember>
    {
        try
        {
            const result = await this.groupMemberService.getOne(params.groupMembershipId, params.relations ? params.relations.split(',') : null);

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
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IGroupMemberList>
    {
        try
        {
            const result = await this.groupMemberService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}