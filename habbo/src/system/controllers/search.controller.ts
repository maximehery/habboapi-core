import { Controller, UseGuards, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { Permission } from '@habboapi/security/decorators';
import { PermissionGuard } from '@habboapi/security/guards/permission.guard';

import { ISystemSearch } from '../interfaces';
import { SearchService } from '../services';

@Controller()
@UseGuards(PermissionGuard)
export class SearchController
{
    constructor(private readonly searchService: SearchService) {}

    @Post('search')
    @HttpCode(HttpStatus.OK)
    @Permission('systemSearch')
    async statistics(@Body() body): Promise<ISystemSearch>
    {
        try
        {
            const result = await this.searchService.search(body.search);

            if(!result) throw new Error('invalid_search');

            return result;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}