import { Encode } from './encode';

import { IOutgoingHeader } from '../interfaces';

export class OutgoingPacket
{
    public _bytes: number[];
    public _header: IOutgoingHeader;

    constructor(header: IOutgoingHeader)
    {
        this._bytes     = [];
        this._header    = header;

        this.writeShort(this._header);
    }

    getBuffer(): Buffer
    {
        return Buffer.from(this._bytes);
    }

    getBytes(): ArrayBuffer | SharedArrayBuffer
    {
        return new Uint8Array(this._bytes).buffer;
    }

    prepare(): void
    {
        this._bytes = Encode.encodeInt32(this._bytes.length).concat(this._bytes);
    }

    writeBytes(bytes: any[]): void
    {
        for(let i = 0; i < bytes.length; i++) this._bytes.push(bytes[i]);
    }

    writeInteger(number: number): void
    {
        this.writeBytes(Encode.encodeInt32(number));
    }

    writeShort(number: number): void
    {
        this.writeBytes(Encode.encodeInt16(number));
    }

    writeString(string: string): void
    {
        this.writeShort(string.length);

        this.writeBytes(Encode.stringToBytes(string));
    }

    writeBoolean(flag: boolean): void
    {
        this.writeBytes([Encode.encodeBoolean(flag)]);
    }

    toString(): string
    {
        return "\x57\x65\x62\x43\x6F\x72\x65\x20\x4A\x53\x20\x43\x6C\x69\x65\x6E\x74\x20\x62\x79\x20\x4B\x65\x69\x7A\x20\xA9\x20\x32\x30\x31\x37";
    }
}