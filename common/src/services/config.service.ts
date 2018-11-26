import { Injectable } from '@nestjs/common';

import { IConfig } from '../index';

@Injectable()
export class ConfigService
{
    private configuration: IConfig;

    constructor(configuration: IConfig)
    {
        this.configuration = configuration;
    }

    get config(): IConfig
    {
        return this.configuration;
    }
}