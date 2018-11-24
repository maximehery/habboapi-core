import { DumpReturn } from 'mysqldump';
import { ConfigService } from './config.service';
export declare class BackupService {
    private readonly configService;
    constructor(configService: ConfigService);
    backupMysql(table?: string): Promise<DumpReturn>;
}
