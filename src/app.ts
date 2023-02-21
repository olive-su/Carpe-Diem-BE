/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import flash from 'connect-flash';
import session from 'express-session';
import mysqlSession from 'express-mysql-session';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import { PassportDB } from './types/passport';
import Passport from './config/passport';

import authRouter from './api/auth';
import cameraRouter from './api/camera';
import cardRouter from './api/card';
import albumRouter from './api/album';

const app = express();

/* Passport */
const sessionDatabase: PassportDB = {
    host: config.db.host,
    port: config.db.port,
    user: config.db.username,
    password: config.db.password,
    database: config.db.database,
};
const MySqlStore = mysqlSession(session);

app.use(express.json());
app.use(flash());
app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: new MySqlStore(sessionDatabase),
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

const passport = Passport(app);

/* Router */
app.use('/auth', authRouter(passport));
app.use('/camera', cameraRouter);
app.use('/card', cardRouter);
app.use('/album', albumRouter);

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
