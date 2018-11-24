export interface IConfig {
    http: {
        https: boolean;
        ip: string;
        port: number;
        httpsPublicKey?: string;
        httpsPrivateKey?: string;
    };
    database: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities?: Array<string>;
        synchronize: boolean;
        logging?: boolean;
        logger?: 'advanced-console' | 'simple-console' | 'file' | 'debug';
    };
    session: {
        secret: string;
    };
    emulator: {
        ip: string;
        port: number;
        portRcon: number;
        newUser: {
            maxAccountsPerIp: number;
            rank: number;
            look: string;
            gender: 'M' | 'F';
            motto: string;
            credits: number;
            duckets: number;
            diamonds: number;
            homeRoom: number;
        };
    };
    public: {
        name: string;
    };
}
