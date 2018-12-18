import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { ISearchOptions } from '@habboapi/common';
import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { ICatalogItem, ICatalogItemList } from '../interfaces';
import { CatalogItemService } from '../services';

@Controller('item')
@UseGuards(PermissionGuard)
export class CatalogItemController
{
    constructor(private readonly catalogItemService: CatalogItemService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog')
    async getAll(@Param() params: { page?: number, relations?: string }): Promise<ICatalogItemList>
    {
        try
        {
            const result = await this.catalogItemService.getAll({
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
    @Permission('catalog')
    async getOne(@Param() params: { itemId: number, relations?: string }): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.getOne(params.itemId, params.relations ? params.relations.split(',') : null);

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
    @Permission('catalog')
    async searchAll(@Body() body: { searchOptions: ISearchOptions }): Promise<ICatalogItemList>
    {
        try
        {
            const result = await this.catalogItemService.getAll(body.searchOptions || null);

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
    @Permission('catalog', 'catalogPatch')
    async patch(@Param() params: { itemId: number }, @Body() body: { item: ICatalogItem }): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.patch(params.itemId, body.item);

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
    @Permission('catalog', 'catalogPut')
    async add(@Body() body: { item: ICatalogItem }): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.put(body.item);

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
    @Permission('catalog', 'catalogDelete')
    async delete(@Param() params: { itemId: number }): Promise<null>
    {
        try
        {
            const result = await this.catalogItemService.delete(params.itemId);

            if(!result) throw new Error('no_results');

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}