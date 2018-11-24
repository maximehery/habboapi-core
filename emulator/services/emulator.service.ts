import { Injectable, OnModuleInit } from '@nestjs/common';

import * as tcpPortUsed from 'tcp-port-used';

import { ConfigService, LogService } from '@habboapi/common';

@Injectable()
export class EmulatorService implements OnModuleInit
{
    gameOnline: boolean = false;

    constructor(
        private readonly configService: ConfigService,
        private readonly logService: LogService) {}

    async onModuleInit()
    {
        try
        {
            await this.checkGameStatus();

            this.logService.success(`[ONLINE] Arcturus Game Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.port}`, 'EmulatorService');
        }

        catch(err)
        {
            if(err.message == 'gameOffline') this.logService.error(`[OFFLINE] Arcturus Game Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.port}`, err.stack, 'EmulatorService');
            else this.logService.error(err.message, err.stack, 'EmulatorService');
        }
    }

    async checkGameStatus(): Promise<boolean>
    {
        const status = await tcpPortUsed.check(this.configService.config.emulator.port, this.configService.config.emulator.ip);

        if(!status)
        {
            this.gameOnline = false;

            throw new Error('gameOffline');
        }

        this.gameOnline = true;

        return true;
    }
}