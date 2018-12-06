import { Controller, Get } from '@nestjs/common';

import { ConfigService } from '@habboapi/common';

@Controller()
export class AppController
{
    constructor(private readonly configService: ConfigService) {}
    
    @Get()
    root(): Object
    {
        return {};
    }

    @Get('/config.json')
    getConfig()
    {
        return this.configService.config.public;
    }
}