import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '../../../security/guards/permission.guard';
import { Permission } from '@habboapi/security';
import { UserService } from '../services/user.service';

import { IUser, IUserList } from '../interfaces';

@Controller()
@UseGuards(PermissionGuard)
export class UserController
{
    constructor(private readonly userService: UserService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('user')
    async getAll(@Param() params): Promise<IUserList>
    {
        try
        {
            const result = await this.userService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noUsers`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':userId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('user')
    async getOne(@Param() params): Promise<IUser>
    {
        try
        {
            const result = await this.userService.getOne(params.userId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidUser`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @Permission('user')
    async searchAll(@Body() body): Promise<IUserList>
    {
        try
        {
            const result = await this.userService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noUsers`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}