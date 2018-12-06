import { IOutgoingHeader } from '../../interfaces';
import { OutgoingPacket } from '../outgoingPacket';

export class OutgoingHandshake
{
    static releaseVersionEvent(): Buffer
    {
        const packet = new OutgoingPacket(IOutgoingHeader.RELEASE_VERSION_EVENT);

        packet.writeString('habboapi');

        packet.prepare();

        return packet.getBuffer();
    }

    static secureLoginEvent(ticket: string): Buffer
    {
        const packet = new OutgoingPacket(IOutgoingHeader.SECURE_LOGIN_EVENT);

        packet.writeString(ticket);

        packet.prepare();

        return packet.getBuffer();
    }

    static pingEvent(): Buffer
    {
        const packet = new OutgoingPacket(IOutgoingHeader.PING_EVENT);

        packet.prepare();

        return packet.getBuffer();
    }
}