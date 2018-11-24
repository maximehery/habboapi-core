import { Controller, UseGuards, Get, Post, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '../../../security/guards/permission.guard';
import { Permission } from '@habboapi/security';
import { ChatlogPrivateService } from '../services/chatlogPrivate.service';

import { IChatlogPrivate, IChatlogPrivateList } from '../interfaces';

@Controller('private')
@UseGuards(PermissionGuard)
export class ChatlogPrivateController
{
    constructor(private readonly chatlogPrivateService: ChatlogPrivateService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('chatlog')
    async getAll(@Param() params): Promise<IChatlogPrivateList>
    {
        try
        {
            const result = await this.chatlogPrivateService.getAll({
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
            await this.chatlogPrivateService.backupAndTruncate();

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
            const result = await this.chatlogPrivateService.getOne(params.chatlogId, params.relations ? params.relations.split(',') : null);

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
            const result = await this.chatlogPrivateService.getAll(body.searchOptions);

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
    @Permission('chatlog', 'catalogDelete')
    async delete(@Param() params): Promise<any>
    {
        try
        {
            const result = await this.chatlogPrivateService.delete(params.chatlogId);

            if(!result) throw new Error(`invalidChatlog`);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}