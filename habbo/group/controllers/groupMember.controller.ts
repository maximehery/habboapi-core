import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '../../../security/guards/permission.guard';
import { Permission } from '@habboapi/security';
import { GroupMemberService } from '../services/groupMember.service';

import { IGroupMember, IGroupMemberList } from '../interfaces';

@Controller('member')
@UseGuards(PermissionGuard)
export class GroupMemberController
{
    constructor(private readonly groupMemberService: GroupMemberService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('group')
    async getAll(@Param() params): Promise<IGroupMemberList>
    {
        try
        {
            const result = await this.groupMemberService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noGroupMemberships`);

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
    async getOne(@Param() params): Promise<IGroupMember>
    {
        try
        {
            const result = await this.groupMemberService.getOne(params.groupId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidGroupMembership`);

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
    async searchAll(@Body() body): Promise<IGroupMemberList>
    {
        try
        {
            const result = await this.groupMemberService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noGroupMemberships`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}