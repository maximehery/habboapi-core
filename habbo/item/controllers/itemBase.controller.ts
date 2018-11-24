import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '../../../security/guards/permission.guard';
import { Permission } from '@habboapi/security';
import { ItemBaseService } from '../services/itemBase.service';

import { IItemBase, IItemBaseList } from '../interfaces';

@Controller('base')
@UseGuards(PermissionGuard)
export class ItemBaseController
{
    constructor(private readonly itemBaseService: ItemBaseService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async getAll(@Param() params): Promise<IItemBaseList>
    {
        try
        {
            const result = await this.itemBaseService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noItemsBase`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':itemBaseId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async getOne(@Param() params): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.getOne(params.itemBaseId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidItemBase`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async searchAll(@Body() body): Promise<IItemBaseList>
    {
        try
        {
            const result = await this.itemBaseService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noItemsBase`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(':itemBaseId')
    @HttpCode(HttpStatus.OK)
    @Permission('item', 'itemPatch')
    async patch(@Param() params, @Body() body): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.patch(params.itemBaseId, body.item);

            if(!result) throw new Error(`invalidItemBase`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Permission('item', 'itemPut')
    async add(@Body() body): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.put(body.item);

            if(!result) throw new Error(`invalidItemBase`);

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':itemBaseId')
    @HttpCode(HttpStatus.OK)
    @Permission('item', 'itemDelete')
    async delete(@Param() params): Promise<any>
    {
        try
        {
            const result = await this.itemBaseService.delete(params.itemBaseId);

            if(!result) throw new Error(`invalidItemBase`);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}