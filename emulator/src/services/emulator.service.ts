import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { Socket } from 'net';

import { ConfigService, LogService } from '@habboapi/common';

@Injectable()
export class EmulatorService implements OnModuleInit, OnModuleDestroy
{
    private gameConnection: Socket;
    private gameOnline: boolean;

    constructor(
        private readonly configService: ConfigService,
        private readonly logService: LogService) {}

    get status(): boolean
    {
        return this.gameOnline;
    }

    onModuleInit()
    {
        if(this.configService.config.emulator.watchEmulator) this.watch();
    }

    onModuleDestroy()
    {
        if(this.gameConnection) this.gameConnection.destroy();
    }

    watch()
    {
        this.gameOnline = false;

        this.gameConnection = new Socket();

        this.connect();

        this.timeout();
        this.close();
        this.error();
    }

    connect()
    {
        if(!this.gameConnection) throw new Error('no_socket');

        this.gameConnection.connect(this.configService.config.emulator.port, this.configService.config.emulator.ip, () =>
        {
            this.gameOnline = true;

            this.logService.log(`Connection Established: ${ this.configService.config.emulator.ip}:${this.configService.config.emulator.port }`, 'EmulatorService');
        });
    }

    timeout()
    {
        this.gameConnection.on('timeout', () =>
        {
            this.gameConnection.destroy();

            this.gameOnline = false;

            this.logService.warn(`Connection Timeout: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.port }`, 'EmulatorService');
        });
    }

    close()
    {
        this.gameConnection.on('close', hadError =>
        {
            this.gameConnection.destroy();

            this.gameOnline = false;

            !hadError && this.logService.warn(`Connection Closed: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.port }`, 'EmulatorService');
        });
    }

    error()
    {
        this.gameConnection.on('error', (err: any) =>
        {
            this.gameConnection.destroy();

            this.gameOnline = false;

            if(err.code == 'ECONNREFUSED')
            {
                this.logService.warn(`Connection Refused: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.port }`, 'EmulatorService');
                this.logService.warn(`The emulator isn't responding, make sure it's online.`, `EmulatorService`);
                this.logService.warn(`Attempting to connect in 30 seconds...`, `EmulatorService`);

                setTimeout(() => this.watch(), 30000);

                return;
            }

            if(err.code == 'ECONNRESET')
            {
                this.logService.warn(`Connection Closed: ${ this.configService.config.emulator.ip }:${ this.configService.config.emulator.port }`, 'EmulatorService');
                this.logService.warn(`The emulator has gone offline, check your emulator for further details.`, `EmulatorService`);
                this.logService.warn(`Attempting to reconnect in 30 seconds...`, `EmulatorService`);

                setTimeout(() => this.watch(), 30000);

                return;
            }
            
            this.logService.warn(`Connection Error: ${ err.message }`, 'EmulatorService');
        });
    }
}