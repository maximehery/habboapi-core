import { Controller, Get, HttpStatus, Param, HttpException } from '@nestjs/common';

import { UserValidatorService } from '../services/userValidator.service';

@Controller('validators')
export class UserValidatorsController
{
    constructor(private readonly userValidatorService: UserValidatorService) {}

    @Get('username/:username')
    async validateUsername(@Param() params): Promise<any>
    {
        try
        {
            await this.userValidatorService.validateUsername(params.username);

            return;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('email/:email')
    async validateEmail(@Param() params): Promise<any>
    {
        try
        {
            await this.userValidatorService.validateEmail(params.email);

            return;
        }

        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }
}