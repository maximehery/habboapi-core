import { ISession } from '@habboapi/security/interfaces';

import * as SocketIO from 'socket.io';

export interface ISocketConnection
{
    socketId: string;
    socketInstance: SocketIO.EngineSocket;
    session: ISession;
}