import { readFileSync } from 'fs';
import * as cluster from 'cluster';

import { NestFactory } from '@nestjs/core';

import { HabboAPI } from './habboapi.module';

import { Config } from './config/config';

import { LogService } from '@habboapi/common';
import { HttpExceptionFilter } from '@habboapi/security';
import { SocketAdapter } from '@habboapi/realtime';

async function bootstrap()
{
    let httpsOptions    = null;

    if(Config.http.https)
    {
        httpsOptions = {
            key: readFileSync('./src/config/private.pem'),
            cert: readFileSync('./src/config/public.pem')
        };
    }

    const app = await NestFactory.create(HabboAPI, {
        cors: {
            origin: Config.http.cors.allowedOrigins,
            credentials: true
        },
        httpsOptions: httpsOptions || null,
        logger: false
    });

    app.disable('x-powered-by');

    app.useLogger(app.get(LogService));
    app.useGlobalFilters(new HttpExceptionFilter());

    app.useWebSocketAdapter(new SocketAdapter(app));

    await app.listen(Config.http.port, Config.http.ip);
}

if(cluster.isMaster && Config.clusters.clustersEnabled)
{
    const totalWorkers = require('os').cpus().length;

    LogService.log(`Setting up ${ totalWorkers } clusters`, `MasterCluster`);

    for(let i = 0; i < totalWorkers; i++) cluster.fork();

    cluster.on('online', worker => LogService.log(`Cluster Loaded`, `Cluster ${ worker.id }`));

    cluster.on('exit', (worker, code, signal) =>
    {
        LogService.error(`Cluster died with exit code ${ code } and signal ${ signal }`, null, `Cluster ${ worker.id }`);

        LogService.log(`Starting new cluster`, `MasterCluster`);

        cluster.fork();
    });
}
else
{
    bootstrap();
}