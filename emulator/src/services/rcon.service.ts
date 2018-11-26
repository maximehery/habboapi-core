import { Injectable, OnModuleInit } from '@nestjs/common';

import { Socket } from 'net';

import { ConfigService, LogService } from '@habboapi/common';

import { IRconMessage, IRconResponse } from '../interfaces';

@Injectable()
export class RconService implements OnModuleInit
{
    rconOnline: boolean = false;

    constructor(
        private readonly configService: ConfigService,
        private readonly logService: LogService) {}

    async onModuleInit()
    {
        try
        {
            await this.checkRconStatus();

            this.logService.success(`[ONLINE] Arcturus RCON Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.portRcon}`, `RconService`);
        }

        catch(err)
        {
            if(err.message == 'rconOffline') this.logService.error(`[OFFLINE] Arcturus RCON Server: ${this.configService.config.emulator.ip}:${this.configService.config.emulator.portRcon}`, err.stack, `RconService`);

            else this.logService.error(err.message, err.stack, `RconService`);
        }
    }

    async checkRconStatus(): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            const socket = new Socket();

            socket.connect(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip, () =>
            {
                this.rconOnline = true;

                resolve(true);
            });

            socket.on('timeout', () =>
            {
                this.rconOnline = false;

                reject(Error('rconOffline'));
            });

            socket.on('error', () =>
            {
                this.rconOnline = false;

                reject(Error('rconOffline'));
            });
        });
    }
    
    async sendMessage(message: IRconMessage): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            if(!message) reject(Error('invalidParameters'));

            if(!this.rconOnline) reject(Error('rconOffline'));

            const socket = new Socket();

            socket.connect(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip, () =>
            {
                socket.write(JSON.stringify(message));
            });

            socket.on('data' , data =>
            {
                const rconResponse: IRconResponse = JSON.parse(data.toString('utf8'));

                return resolve(true);
            })

            socket.on('timeout', () =>
            {
                this.rconOnline = false;

                return reject(Error('rconOffline'));
            });

            socket.on('error', () =>
            {
                this.rconOnline = false;

                return reject(false);
            });
        });
    }
}