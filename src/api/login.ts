/* eslint-disable no-var */

/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Request, Response } from 'express';
const parseurl = require('parseurl');
const route = express.Router();
import cors from 'cors';
import session from 'express-session';
const passport = require('passport');

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);

route.get('/google', function (req, res, next) {
    // GET /user/google
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

route.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
    }),
    function (req, res, next) {
        console.log('!!!!!!!!0');
        res.status(200).redirect('http://localhost:3000/');
    },
);

export default route;
