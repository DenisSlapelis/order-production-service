import 'reflect-metadata';
import { Express } from 'express';
import { app } from './app';
import { database, env } from '@env';
import * as logger from '@logger';
import { showMemory } from '@utils/memory.utils';
import { listenQueues } from './factories/queue.factory';

const main = async () => {
    logger.warn(JSON.stringify(showMemory()));

    await env.populateAllEnvs();

    await Promise.all([database.connect(), listenQueues()]);

    startServer(app, env.getValue('PORT'));
};

const startServer = (app: Express, port: number) => {
    app.listen(port, () => {
        logger.info(`Server is running on http://localhost:${port}`);
    });
};

main().catch((err) => logger.error(`== error: ${err}`));
