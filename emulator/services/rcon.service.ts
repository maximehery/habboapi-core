import { Injectable, OnModuleInit } from '@nestjs/common';

import * as tcpPortUsed from 'tcp-port-used';
import { PromiseSocket } from 'promise-socket';

import { ConfigService, LogService } from '@habboapi/common';

import { IRconMessage, IRconResponse, IRconResponseStatus } from '../interfaces';

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

    async checkRconStatus(): Promise<boolean>
    {
        const status = await tcpPortUsed.check(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip);

        if(!status)
        {
            this.rconOnline = false;

            throw new Error(`rconOffline`);
        }

        this.rconOnline = true;

        return true;
    }
    
    async sendMessage(message: IRconMessage): Promise<boolean>
    {
        if(!message) throw new Error(`invalidParameters`);

        await this.checkRconStatus();

        const socket = new PromiseSocket();

        await socket.connect(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip);

        await socket.write(JSON.stringify(message));

        const socketResponse = await socket.readAll();

        socket.destroy();

        const socketResponseMessage = socketResponse.toString('utf8');

        if(!socketResponseMessage) throw new Error(`rconNoResponse`);
        
        const rconResponse: IRconResponse = JSON.parse(socketResponseMessage);

        if(rconResponse.status == IRconResponseStatus.habboNotFound) throw new Error(`rconHabboNotFound`);

        return true;
    }
}