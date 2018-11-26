import { Injectable, OnModuleInit } from '@nestjs/common';

import { Socket } from 'net';

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

    async checkGameStatus(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            const socket = new Socket();

            socket.connect(this.configService.config.emulator.port, this.configService.config.emulator.ip, () =>
            {
                this.gameOnline = true;

                resolve(true);
            });

            socket.on('timeout', () =>
            {
                this.gameOnline = false;

                reject(Error('gameOffline'));
            });

            socket.on('error', () =>
            {
                this.gameOnline = false;

                reject(Error('gameOffline'));
            });
        });
    }
}