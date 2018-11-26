import { OnModuleInit } from '@nestjs/common';
import { ConfigService, LogService } from '@habboapi/common';
import { IRconMessage } from '../interfaces';
export declare class RconService implements OnModuleInit {
    private readonly configService;
    private readonly logService;
    rconOnline: boolean;
    constructor(configService: ConfigService, logService: LogService);
    onModuleInit(): Promise<void>;
    checkRconStatus(): Promise<any>;
    sendMessage(message: IRconMessage): Promise<any>;
}
