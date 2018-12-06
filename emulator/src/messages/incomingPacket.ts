import { Decode } from './decode';

import { IIncomingHeader } from '../interfaces';

export class IncomingPacket
{
    public _packet: Buffer;
    public _decoded: Decode;

    constructor(packet: Buffer)
    {
        this._packet    = packet;
        this._decoded   = new Decode(this._packet);
    }
}