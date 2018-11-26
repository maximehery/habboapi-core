import { OnModuleInit } from '@nestjs/common';
import { ConfigService, LogService } from '@habboapi/common';
export declare class EmulatorService implements OnModuleInit {
    private readonly configService;
    private readonly logService;
    gameOnline: boolean;
    constructor(configService: ConfigService, logService: LogService);
    onModuleInit(): Promise<void>;
    checkGameStatus(): Promise<any>;
}
