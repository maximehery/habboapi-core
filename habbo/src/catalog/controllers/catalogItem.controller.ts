import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard, Permission } from '@habboapi/security';
import { CatalogItemService } from '../services/catalogItem.service';

import { ICatalogItem, ICatalogItemList } from '../interfaces';

@Controller('item')
@UseGuards(PermissionGuard)
export class CatalogItemController
{
    constructor(private readonly catalogItemService: CatalogItemService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog')
    async getAll(@Param() params): Promise<ICatalogItemList>
    {
        try
        {
            const result = await this.catalogItemService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error(`noItems`);

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
    async getOne(@Param() params): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.getOne(params.itemId, params.relations ? params.relations.split(',') : null);

            if(!result) throw new Error(`invalidItem`);

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
    async searchAll(@Body() body): Promise<ICatalogItemList>
    {
        try
        {
            const result = await this.catalogItemService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error(`noItems`);

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
    async patch(@Param() params, @Body() body): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.patch(params.itemId, body.item);

            if(!result) throw new Error(`invalidItem`);

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
    async add(@Body() body): Promise<ICatalogItem>
    {
        try
        {
            const result = await this.catalogItemService.put(body.item);

            if(!result) throw new Error(`invalidItem`);

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
    async delete(@Param() params): Promise<any>
    {
        try
        {
            const result = await this.catalogItemService.delete(params.itemId);

            if(!result) throw new Error(`invalidItem`);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}