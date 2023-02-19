/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import passport from 'passport';
import google from './google';
import db from '../models';
const User = db.user;

//로그인 설정
export default function passportConfig() {
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
    google();
}
