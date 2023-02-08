import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import cameraRouter from './api/camera';

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use('/camera', cameraRouter);

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
