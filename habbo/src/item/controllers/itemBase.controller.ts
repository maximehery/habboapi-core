import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators';

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
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IItemBaseList>
    {
        try
        {
            const result = await this.itemBaseService.getAll({
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

    @Get(':itemBaseId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async getOne(@Param() params: { itemBaseId: number, relations?: string}): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.getOne(params.itemBaseId, params.relations ? params.relations.split(',') : null);

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
    @Permission('item')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IItemBaseList>
    {
        try
        {
            const result = await this.itemBaseService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

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
    async patch(@Param() params: { itemBaseId: number }, @Body() body: { item: IItemBase }): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.patch(params.itemBaseId, body.item);

            if(!result) throw new Error('no_results');

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
    async add(@Body() body: { item: IItemBase }): Promise<IItemBase>
    {
        try
        {
            const result = await this.itemBaseService.put(body.item);

            if(!result) throw new Error('no_results');

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
    async delete(@Param() params: { itemBaseId: number }): Promise<any>
    {
        try
        {
            const result = await this.itemBaseService.delete(params.itemBaseId);

            if(!result) throw new Error('no_results');

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}