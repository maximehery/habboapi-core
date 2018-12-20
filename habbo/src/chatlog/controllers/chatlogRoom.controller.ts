import { Controller, UseGuards, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Authentication, Permission } from '@habboapi/security/decorators';
import { AuthenticationGuard } from '@habboapi/security/guards/authentication.guard';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';
import { ChatlogRoomService } from '../services';

@Controller('room')
@UseGuards(AuthenticationGuard, PermissionGuard)
export class ChatlogRoomController
{
    constructor(private readonly chatlogRoomService: ChatlogRoomService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('chatlog')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IChatlogPrivateList>
    {
        try
        {
            const result = await this.chatlogRoomService.getAll({
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

    @Get('backup')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('chatlog', 'chatlogBackup')
    async backup(): Promise<any>
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
    @Authentication(true)
    @Permission('chatlog')
    async getOne(@Param() params: { chatlogId: number, relations?: string}): Promise<IChatlogPrivate>
    {
        try
        {
            const result = await this.chatlogRoomService.getOne(params.chatlogId, params.relations ? params.relations.split(',') : null);

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
    @Permission('chatlog')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IChatlogPrivateList>
    {
        try
        {
            const result = await this.chatlogRoomService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':chatlogId')
    @HttpCode(HttpStatus.OK)
    @Authentication(true)
    @Permission('chatlog', 'chatlogDelete')
    async delete(@Param() params: { chatlogId: number }): Promise<any>
    {
        try
        {
            const result = await this.chatlogRoomService.delete(params.chatlogId);

            if(!result) throw new Error('no_results');

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}