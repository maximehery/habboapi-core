import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators';

import { ItemService } from '../services/item.service';
import { IItem, IItemList } from '../interfaces';

@Controller()
@UseGuards(PermissionGuard)
export class ItemController
{
    constructor(private readonly itemService: ItemService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<IItemList>
    {
        try
        {
            const result = await this.itemService.getAll({
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

    @Get(':itemId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('item')
    async getOne(@Param() params: { itemId: number, relations?: string }): Promise<IItem>
    {
        try
        {
            const result = await this.itemService.getOne(params.itemId, params.relations ? params.relations.split(',') : null);

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
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<IItemList>
    {
        try
        {
            const result = await this.itemService.getAll(body.searchOptions || null);

            if(!result || !result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(':itemId')
    @HttpCode(HttpStatus.OK)
    @Permission('item', 'itemPatch')
    async patch(@Param() params: { itemId: number }, @Body() body: { item: IItem }): Promise<IItem>
    {
        try
        {
            const result = await this.itemService.patch(params.itemId, body.item);

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
    async add(@Body() body: { item: IItem }): Promise<IItem>
    {
        try
        {
            const result = await this.itemService.put(body.item);

            if(!result) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':itemId')
    @HttpCode(HttpStatus.OK)
    @Permission('item', 'itemDelete')
    async delete(@Param() params: { itemId: number }): Promise<any>
    {
        try
        {
            const result = await this.itemService.delete(params.itemId);

            if(!result) throw new Error('no_results');

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}