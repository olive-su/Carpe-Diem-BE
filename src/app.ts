/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';
import Logger from './loaders/logger';
import loaders from './loaders';
import config from './config';

import cameraRouter from './api/camera';
import cardRouter from './api/card';
import albumRouter from './api/album';

import authRouter from './api/login';
import db from './models';
const GoogleStrategy = require('passport-google-oauth2').OAuth2Strategy;
const User = db.user;
const app = express();

app.use('/camera', cameraRouter);
app.use('/card', cardRouter);
app.use('/album', albumRouter);

app.use('/auth', authRouter);

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
const options = {
    host: `${config.db.host}`,
    port: `${config.db.port}`,
    user: `${config.db.username}`,
    password: `${config.db.password}`,
    database: `${config.db.database}`,
};

// mysql session store 생성
const passport = require('passport');
import session from 'express-session';
const MySQLStore = require('express-mysql-session')(session);
//const sessionStore = new MySQLStore(options);
//import google from './passport/google';
import passportConfig from './passport';
import google from './passport/google';
app.use(express.json());

app.use(
    session({
        key: 'session_cookie_name',
        secret: 'session_cookie_secret',
        store: new MySQLStore(options),
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
    //        const { userId } = user;
    console.log('!!!!');
    return done(null, user);
});
passport.deserializeUser(async (user, done) => {
    try {
        /*const user = await User.findOne({
            where: { userId },
        });
        */
        return done(null, user); //req.user
    } catch (err) {
        console.error(err);
        return done(err);
    }
});

//passport.use('google', google);
google();

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
