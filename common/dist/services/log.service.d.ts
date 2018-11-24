import { LoggerService } from '@nestjs/common';
import { ConfigService } from './config.service';
export declare class LogService implements LoggerService {
    private readonly configService;
    constructor(configService: ConfigService);
    logAppend: string;
    log(message: string, context?: string): void;
    error(message: string, trace: string, context?: string): void;
    success(message: string, context?: string): void;
    warn(message: string, context?: string): void;
}
