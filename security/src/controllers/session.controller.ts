import { Controller, Get, HttpCode, Req } from '@nestjs/common';

import { AuthenticationService } from '../services/authentication.service';

import { ISession } from '../interfaces';

@Controller('session')
export class SessionController
{
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Get()
    @HttpCode(200)
    async get(@Req() req: any): Promise<ISession>
    {
        return req.user;
    }
}