import { DynamicModule } from '@nestjs/common';
import { Connection } from 'typeorm';
import { IConfig } from './interfaces';
export declare class CommonModule {
    private readonly connection;
    constructor(connection: Connection);
    static forRoot(configuration: IConfig): DynamicModule;
}
