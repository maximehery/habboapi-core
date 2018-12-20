import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Authentication, Permission } from '@habboapi/security/decorators';
import { AuthenticationGuard } from '@habboapi/security/guards/authentication.guard';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { IUser, IUserList } from '../interfaces';
import { UserService } from '../services';

@Controller()
@UseGuards(AuthenticationGuard, PermissionGuard)
export class UserController
{
    constructor(private readonly userService: UserService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('user')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IUserList>
    {
        try
        {
            const result = await this.userService.getAll({
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

    @Get(':userId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('user')
    async getOne(@Param() params: { userId: number, relations?: string }): Promise<IUser>
    {
        try
        {
            const result = await this.userService.getOne(params.userId, params.relations ? params.relations.split(',') : null);

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
    @Permission('user')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IUserList>
    {
        try
        {
            const result = await this.userService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}