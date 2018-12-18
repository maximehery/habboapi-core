import { Injectable } from '@nestjs/common';

import * as SocketIO from 'socket.io';

import { SessionService } from '@habboapi/security/services/session.service';

import { ISocketConnection } from '../interfaces';

@Injectable()
export class SocketService
{
    private ioServer: SocketIO.Server;
    private ioConnections: ISocketConnection[] = [];

    constructor(private readonly sessionService: SessionService) {}

    get socketServer(): SocketIO.Server
    {
        return this.ioServer;
    }

    set socketServer(server: SocketIO.Server)
    {
        this.ioServer = server;
    }

    get connections(): ISocketConnection[]
    {
        return this.ioConnections;
    }

    addConnection(connection: ISocketConnection)
    {
        if(!this.ioServer) return;

        this.ioConnections.push(connection);
    }

    onConnection()
    {

    }
}