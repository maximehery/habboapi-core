import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
  } from '@nestjs/websockets';
  import { from, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';

  import { SocketAdapter } from '../adapters';
  
  @WebSocketGateway(443, {
    adapter: SocketAdapter,
    transports: ['websockets']
  })
  export class EventsGateway implements OnGatewayConnection {
    @WebSocketServer() server;
  
    @SubscribeMessage('events')
    findAll(client, data): Observable<WsResponse<number>> {
      return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
    }
  
    @SubscribeMessage('identity')
    async identity(client, data: number): Promise<number> {
      return data;
    }

    handleConnection(client)
    {
        console.log(client);
    }
  }