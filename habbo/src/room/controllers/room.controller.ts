import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { IRoom, IRoomList } from '../interfaces';
import { RoomService } from '../services';

@Controller()
@UseGuards(PermissionGuard)
export class RoomController
{
    constructor(private readonly roomService: RoomService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('room')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IRoomList>
    {
        try
        {
            const result = await this.roomService.getAll({
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

    @Get(':roomId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('room')
    async getOne(@Param() params: { roomId: number, relations?: string }): Promise<IRoom>
    {
        try
        {
            const result = await this.roomService.getOne(params.roomId, params.relations ? params.relations.split(',') : null);

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
    @Permission('room')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IRoomList>
    {
        try
        {
            const result = await this.roomService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}