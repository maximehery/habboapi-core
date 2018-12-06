import { Injectable, Optional, LoggerService } from '@nestjs/common';

import * as clc from 'cli-color';
import * as moment from 'moment';

@Injectable()
export class LogService implements LoggerService
{
    private static prevTimestamp?: number;
    private static logService?: typeof LogService | LoggerService = LogService;
    
    constructor(@Optional() private readonly context?: string) {}
    
    log(message: any, context?: string)
    {
        const { logService } = LogService;
        
        logService === this ? LogService.log(message, context || this.context) : logService && logService.log.call(logService, message, context || this.context);
    }
    
    error(message: any, trace?: any, context?: string)
    {
        const { logService } = LogService;
        
        logService === this ? LogService.error(message, trace, context || this.context) : logService && logService.error.call(logService, message, trace, context || this.context);
    }
    
    warn(message: any, context?: string)
    {
        const { logService } = LogService;
        
        logService === this ? LogService.warn(message, context || this.context) : logService && logService.warn.call(logService, message, context || this.context);
    }
  
    static log(message: any, context?: string)
    {
        this.printMessage(message, clc.green, context);
    }
    
    static error(message: any, trace?: any, context?: string)
    {
        this.printMessage(message, clc.red, context);
        this.printStackTrace(trace);
    }
  
    static warn(message: any, context?: string)
    {
        this.printMessage(message, clc.white, context);
    }
    
    private static printMessage(message: any, color: (color: string) => string, context?: string)
    {
        let output = message && typeof message === 'object' ? JSON.stringify(message, null, 2) : message;

        output = output == 'Nest application successfully started' ? 'HabboAPI Started' : output;
        context = context == 'RoutesResolver' || context == 'RouterExplorer' ? 'Router' : context == 'NestApplication' || !context ? 'HabboAPI' : context;
        
        process.stdout.write(` ${ color(`[HabboAPI]`) } ${ moment().format('M/D/YY h:mm:ss A') } `);
        context && process.stdout.write(clc.cyan(`[${ context }] `));
        process.stdout.write(color(output));
        
        this.printTimestamp();
        process.stdout.write(`\n`);
    }
  
    private static printTimestamp()
    {
        const now = Date.now();

        process.stdout.write(clc.blackBright(` +${ now - LogService.prevTimestamp || 0 }ms`));
        
        LogService.prevTimestamp = now;
    }
  
    private static printStackTrace(trace: string)
    {
        process.stdout.write(trace ? trace : 'No stack trace provided');
        process.stdout.write(`\n`);
    }
}