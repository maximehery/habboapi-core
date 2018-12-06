import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { Socket } from 'net';

import { ConfigService, LogService } from '@habboapi/common';
import { IRconResponse } from '../interfaces';

@Injectable()
export class RconService implements OnModuleInit, OnModuleDestroy
{
    private rconConnection: Socket;
    private rconOnline: boolean;

    constructor(
        private readonly configService: ConfigService,
        private readonly logService: LogService) {}

    get status(): boolean
    {
        return this.rconOnline;
    }

    onModuleInit()
    {
        if(this.configService.config.emulator.watchRcon) this.watch();
    }

    onModuleDestroy()
    {
        if(this.rconConnection) this.rconConnection.destroy();
    }

    watch()
    {
        this.rconOnline = false;

        this.rconConnection = new Socket();

        this.connect();
        this.data();
        this.close();
        this.error();
    }

    connect()
    {
        if(!this.rconConnection) throw new Error('no_socket');

        this.rconConnection.connect(this.configService.config.emulator.portRcon, this.configService.config.emulator.ip, () =>
        {
            this.rconOnline = true;

            this.logService.log(`Connection Established: ${ this.configService.config.emulator.ip}:${this.configService.config.emulator.portRcon }`, 'RconService');
        });
    }

    data()
    {
        this.rconConnection.on('data', data =>
        {
            const response: IRconResponse = JSON.parse(data.toString('utf8'));

            this.logService.log(`Connection Response: ${ response }`, 'RconService');
        });
    }

    close()
    {
        this.rconConnection.on('close', hadError =>
        {
            this.rconConnection.destroy();

            this.rconOnline = false;

            if(!hadError)
            {
                this.logService.warn(`Connection Closed: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.portRcon }`, 'RconService');
                this.logService.warn(`The server is denying access`, 'RconService');
            }
        });
    }

    error()
    {
        this.rconConnection.on('error', (err: any) =>
        {
            this.rconConnection.destroy();

            this.rconOnline = false;

            if(err.code == 'ECONNREFUSED')
            {
                this.logService.warn(`Connection Refused: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.portRcon }`, 'RconService');
                this.logService.warn(`The rcon server isn't responding, make sure it's online.`, `RconService`);
                this.logService.warn(`Attempting to connect in 30 seconds...`, `RconService`);

                setTimeout(() => this.onModuleInit(), 30000);

                return;
            }

            if(err.code == 'ECONNRESET')
            {
                this.logService.warn(`Connection Closed: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.portRcon }`, 'RconService');
                this.logService.warn(`The rcon server has gone offline, check your emulator for further details.`, `RconService`);
                this.logService.warn(`Attempting to reconnect in 30 seconds...`, `RconService`);

                setTimeout(() => this.onModuleInit(), 30000);

                return;
            }
            
            this.logService.warn(`Connection Error: ${ err.message }`, 'RconService');
        });
    }
}