import { Controller, UseGuards, Get, Post, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard, Permission } from '@habboapi/security';
import { RoomService } from '../services/room.service';

import { IRoom, IRoomList } from '../interfaces';

@Controller()
@UseGuards(PermissionGuard)
export class RoomController
{
    constructor(private readonly roomService: RoomService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('room')
    async getAll(@Param() params): Promise<IRoomList>
    {
        try
        {
            const result = await this.roomService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noRooms`);

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
    async getOne(@Param() params): Promise<IRoom>
    {
        try
        {
            const result = await this.roomService.getOne(params.roomId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidRoom`);

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
    async searchAll(@Body() body): Promise<IRoomList>
    {
        try
        {
            const result = await this.roomService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noRooms`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}