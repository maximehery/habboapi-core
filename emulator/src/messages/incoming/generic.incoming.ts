import { IIncomingHeader } from '../../interfaces';

import { IncomingPacket } from '../incomingPacket';

export class IncomingGeneric
{
    static alertEvent(packet: IncomingPacket): number
    {
        if(packet._decoded._header != IIncomingHeader.GENERIC_ALERT_COMPOSER) return;
    }
}