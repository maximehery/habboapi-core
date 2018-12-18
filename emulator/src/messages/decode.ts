import { IIncomingHeader } from '../interfaces';

export class Decode
{
    public _packet: Buffer;
    public _length: number;
    public _header: IIncomingHeader;
    public _strlen: number;
    public _bool: number;

    public str: any[];

    constructor(packet: Buffer)
    {
        this._packet = Buffer.from(packet);

        this._header = this._packet.readInt16BE(4);
        this._length = this._packet.readInt32BE(0);

        this.str = [];

        /*
        for (let i = 0; i <= this._packetStrlen; i++) {
            this.str[i] = this._packet[8 + i];
        }

        this.setBool();*/
    }

    setStrlen()
    {
        this._strlen = this._packet.readInt16BE(6);
    }

    setBool()
    {
        this._bool = this._packet.readInt8(8 + this._strlen);
    }
}