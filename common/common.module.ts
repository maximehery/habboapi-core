import { Module, Global, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { BackupService, ConfigService, LogService } from './services';
import { IConfig } from './interfaces';

@Global()
@Module({})
export class CommonModule
{
    constructor(private readonly connection: Connection) {}
    
    static forRoot(configuration: IConfig): DynamicModule
    {
        return {
            module: CommonModule,
            imports: [ TypeOrmModule.forRoot(<TypeOrmModuleOptions> configuration.database) ],
            providers: [
                {
                    provide: ConfigService,
                    useFactory: () =>
                    {
                        return new ConfigService(configuration);
                    }
                },
                BackupService,
                LogService
            ],
            exports: [ ConfigService, BackupService, LogService ]
        }
    }
}