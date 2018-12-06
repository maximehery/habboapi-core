import { Injectable } from '@nestjs/common';

import { address } from 'ip';

import { IConfig } from '../interfaces';

@Injectable()
export class ConfigService
{
    private configuration: IConfig;
    private serverAddress: string;

    constructor(configuration: IConfig)
    {
        this.configuration = configuration;
        this.serverAddress = address();
    }

    get config(): IConfig
    {
        return this.configuration;
    }

    get serverIp(): string
    {
        return this.serverAddress;
    }
}