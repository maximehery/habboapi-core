import { readFileSync } from 'fs';

import { NestFactory } from '@nestjs/core';

import { HabboAPI } from './habboapi.module';

import { Config } from './config/config';

import { LogService } from '@habboapi/common';

async function bootstrap()
{
    let httpsOptions = null;

    if(Config.http.https)
    {
        httpsOptions = {
            key: readFileSync('./src/config/private.pem'),
            cert: readFileSync('./src/config/public.pem')
        };
    }

    const app = await NestFactory.create(HabboAPI, {
        cors: true,
        httpsOptions: httpsOptions || null,
        logger: false
    });

    app.useLogger(app.get(LogService));

    await app.listen(Config.http.port, Config.http.ip);
}

bootstrap();