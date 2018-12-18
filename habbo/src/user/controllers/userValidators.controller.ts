import { Controller, Get, HttpStatus, Param, HttpCode, HttpException } from '@nestjs/common';

import { UserValidatorService } from '../services';

@Controller('validators')
export class UserValidatorsController
{
    constructor(private readonly userValidatorService: UserValidatorService) {}

    @Get('username/:username')
    @HttpCode(HttpStatus.OK)
    async validateUsername(@Param() params): Promise<null>
    {
        try
        {
            await this.userValidatorService.validateUsername(params.username);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('email/:email')
    @HttpCode(HttpStatus.OK)
    async validateEmail(@Param() params): Promise<null>
    {
        try
        {
            await this.userValidatorService.validateEmail(params.email);

            return null;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}