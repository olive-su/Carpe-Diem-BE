import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import cameraRouter from './api/camera';
import cardRouter from './api/card';

import ApiDcos from './docs/index';

const app = express();

function getSwaggerOption() {
    const apiDocs = new ApiDcos();
    apiDocs.init();

    return apiDocs.getSwaggerOption();
}

const { swaggerUI, specs, setUpoption } = getSwaggerOption();

app.use('/camera', cameraRouter);
app.use('/card', cardRouter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs, setUpoption));

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

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
