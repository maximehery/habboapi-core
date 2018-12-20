import { Controller, UseGuards, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { Authentication } from '../decorators';
import { AuthenticationGuard } from '../guards';
import { ISession } from '../interfaces';
import { AuthenticationService } from '../services';

@Controller('authentication')
@UseGuards(AuthenticationGuard)
export class AuthenticationController
{
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @Authentication(false)
    async login(@Body() body): Promise<{ sessionToken: string, session: ISession }>
    {
        try
        {
            const session = await this.authenticationService.login(body.username, body.password);

            if(!session) throw new Error('invalid_login');

            return session;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}