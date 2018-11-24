import { IConfig } from '../index';
export declare class ConfigService {
    private configuration;
    constructor(configuration: IConfig);
    readonly config: IConfig;
}
