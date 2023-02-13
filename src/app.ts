import express from 'express';
import cors from 'cors';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import cameraRouter from './api/camera';
import cardRouter from './api/card';
import albumRouter from './api/album';

const app = express();

app.use('/camera', cameraRouter);
app.use('/card', cardRouter);
app.use('/album', albumRouter);

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());

const startServer = async () => {
    await loaders(app);

    app.listen(config.port, () => {
        Logger.info(`🛡️  Server listening on: http://${config.host}:${config.port} 🛡️`);
    }).on('error', (err) => {
        Logger.error(err);
        process.exit(1);
    });
};

startServer();
