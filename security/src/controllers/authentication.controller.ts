import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { AuthenticationService } from '../services/authentication.service';
import { ISession } from '../interfaces';

@Controller('authentication')
export class AuthenticationController
{
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() body): Promise<{ sessionToken: string, session: ISession }>
    {
        try
        {
            const session = await this.authenticationService.login(body.username, body.password);

            if(!session) throw new HttpException('invalid_login', HttpStatus.BAD_REQUEST);

            return session;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}