export interface IConfig
{
    clusters: {
        clustersEnabled: boolean;
    },
    http: {
        https: boolean;
        ip: string;
        port: number;
        cors: {
            allowedOrigins: string[]
        }
    },
    database: {
        type: 'mysql';
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        entities?: string[];
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
            currencies?: { type: number, amount: number}[];
        }
    },
    public: {
        name: string;
        apiUrl: string;
        socketUrl: string;
        images: {
            avatars: string;
            badges: string;
            badgesGroup: string;
            camera: string;
            news: string;
        }
    }
}