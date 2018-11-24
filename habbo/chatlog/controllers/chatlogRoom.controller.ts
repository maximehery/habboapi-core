import { Controller, UseGuards, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '../../../security/guards/permission.guard';
import { Permission } from '@habboapi/security';
import { ChatlogRoomService } from '../services/chatlogRoom.service';

import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';

@Controller('room')
@UseGuards(PermissionGuard)
export class ChatlogRoomController
{
    constructor(private readonly chatlogRoomService: ChatlogRoomService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog')
    async getAll(@Param() params): Promise<IChatlogPrivateList>
    {
        try
        {
            const result = await this.chatlogRoomService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noChatlogs`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('backup')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog', 'chatlogBackup')
    async backup(@Param() params): Promise<any>
    {
        try
        {
            await this.chatlogRoomService.backupAndTruncate();

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':chatlogId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog')
    async getOne(@Param() params): Promise<IChatlogPrivate>
    {
        try
        {
            const result = await this.chatlogRoomService.getOne(params.chatlogId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidChatlog`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog')
    async searchAll(@Body() body): Promise<IChatlogPrivateList>
    {
        try
        {
            const result = await this.chatlogRoomService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noChatlogs`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':chatlogId')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog', 'chatlogDelete')
    async delete(@Param() params): Promise<any>
    {
        try
        {
            const result = await this.chatlogRoomService.delete(params.chatlogId);

            if(!result) throw new Error(`invalidChatlog`);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}