import { Controller, Post, Body, HttpCode, HttpStatus, HttpException } from '@nestjs/common';

import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController
{
    constructor(private readonly authenticationService: AuthenticationService) {}

    @Post('login')
    @HttpCode(200)
    async login(@Body() body): Promise<{ sessionToken: string }>
    {
        try
        {
            const token = await this.authenticationService.login(body.username, body.password);

            if(!token) throw new HttpException('invalidLogin', HttpStatus.BAD_REQUEST);

            return { sessionToken: token };
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}