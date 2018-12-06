export interface IConfig
{
    http: {
        https: boolean;
        ip: string;
        port: number;
    },
    database: {
        type: 'mysql';
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities?: Array<string>;
        synchronize: boolean;
        logging?: boolean;
        logger?: 'advanced-console' | 'simple-console' | 'file' | 'debug';
    },
    session: {
        secret: string;
    },
    emulator: {
        ip: string;
        port: number;
        portRcon: number;
        watchEmulator: boolean;
        watchRcon: boolean;
        newUser: {
            maxAccountsPerIp: number;
            rank: number;
            look: string;
            gender: 'M' | 'F';
            motto: string;
            credits: number;
            homeRoom: number;
            currencies?: Array<{ type: number, amount: number}>;
        }
    },
    public: {
        name: string;
        apiUrl: string;
    }
}