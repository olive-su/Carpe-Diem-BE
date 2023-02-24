import express from 'express';
import http from 'http';
import https from 'https';
import cors from 'cors';
import fs from 'fs';
import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';

import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';
import albumRouter from './api/album';
import cameraRouter from './api/camera';
import cardRouter from './api/card';

const app = express();
// const privateKey = fs.readFileSync(config.ssl.privateKey);
// const certificate = fs.readFileSync(config.ssl.certificate);
// const credentials = { key: privateKey, cert: certificate };

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

const httpsNodeServer = new http.Server(app);
const httpsSocketServer = new http.Server(app);
const startServer = async () => {
    await loaders(app);

    httpsNodeServer
        .listen(config.port, () => {
            Logger.info(`🛡️  Server listening on: http://${config.host}:${config.port} 🛡️`);
        })
        .on('error', (err) => {
            Logger.error(err);
            process.exit(1);
        });
};

startServer();

// socket settings
const wsServer = new Server(httpsSocketServer, {
    cors: {
        origin: '*',
        credentials: true,
    },
});

httpsSocketServer.listen(5000, () => {
    console.log(`Listening on port 5000.`);
});

instrument(wsServer, {
    auth: false,
});

wsServer.on('connection', (socket) => {
    console.log(wsServer.sockets.adapter);
    socket.on('join_room', (roomName, done) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });

    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    });
    socket.on('ice', (ice, roomName) => {
        socket.to(roomName).emit('ice', ice);
    });
});

export default app;
