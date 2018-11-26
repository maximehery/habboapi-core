import { Injectable, LoggerService } from '@nestjs/common';

import chalk from 'chalk';
import * as moment from 'moment';

import { ConfigService } from './config.service';

@Injectable()
export class LogService implements LoggerService
{
    constructor(private readonly configService: ConfigService) {}

    logAppend = chalk.green(' [HabboAPI] ') + moment().format('D/M/YY h:mm:ss A') + ' - ';

    log(message: string, context?: string)
    {
        if(context == 'NestApplication' && message == 'Nest application successfully started')
        {
            this.success(`[ONLINE] API Server: ${this.configService.config.http.ip}:${this.configService.config.http.port}`, 'HabboAPI');
            return;
        }

        if(context == 'RouterExplorer' || context == 'RoutesResolver') return;
        else return console.log(this.logAppend + (context ? chalk.yellow(`[${context}] `) : null) + message);
    }

    error(message: string, trace: string, context?: string)
    {
        return console.log(this.logAppend + (context ? chalk.yellow(`[${context}] `) : null) + chalk.red(message));
    }

    success(message: string, context?: string): void
    {
        return console.log(this.logAppend + (context ? chalk.yellow(`[${context}] `) : null) + chalk.green(message));
    }

    warn(message: string, context?: string): void
    {
        return console.log(this.logAppend + (context ? chalk.yellow(`[${context}] `) : null) + chalk.yellow(message));
    }
}