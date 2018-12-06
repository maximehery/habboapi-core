import { Controller, UseGuards, Get, Post, Patch, Put, Delete, Param, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { PermissionGuard } from '@habboapi/security/guards/permission.guard';
import { Permission } from '@habboapi/security/decorators/permission.decorator';

import { CatalogPageService } from '../services/catalogPage.service';

import { ICatalogPage, ICatalogPageList } from '../interfaces';

@Controller('page')
@UseGuards(PermissionGuard)
export class CatalogPageController
{
    constructor(private readonly catalogPageService: CatalogPageService) {}

    @Get('all/:page?/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog')
    async getAll(@Param() params): Promise<ICatalogPageList>
    {
        try
        {
            const result = await this.catalogPageService.getAll({
                page: params.page,
                relations: params.relations ? params.relations.split(',') : null
            });

            if(!result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':pageId/:relations?')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog')
    async getOne(@Param() params): Promise<ICatalogPage>
    {
        try
        {
            const result = await this.catalogPageService.getOne(params.pageId, params.relations ? params.relations.split(',') : null);

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
    async searchAll(@Body() body): Promise<ICatalogPageList>
    {
        try
        {
            const result = await this.catalogPageService.getAll(body.searchOptions);

            if(!result.pagination.totalItems) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Patch(':pageId')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog', 'catalogPatch')
    async patch(@Param() params, @Body() body): Promise<ICatalogPage>
    {
        try
        {
            const result = await this.catalogPageService.patch(params.pageId, body.page);

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
    async add(@Body() body): Promise<ICatalogPage>
    {
        try
        {
            const result = await this.catalogPageService.put(body.page);

            if(!result) throw new Error('no_results');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':pageId')
    @HttpCode(HttpStatus.OK)
    @Permission('catalog', 'catalogDelete')
    async delete(@Param() params): Promise<any>
    {
        try
        {
            const result = await this.catalogPageService.delete(params.pageId);

            if(!result) throw new Error('no_results');

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}