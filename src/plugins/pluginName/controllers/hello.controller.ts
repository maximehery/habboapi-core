import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller()
export class HelloController
{
    constructor() {}

    @Get()
    @HttpCode(200)
    greet(): Object
    {
        return {};
    }
}