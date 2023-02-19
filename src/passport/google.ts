/* eslint-disable @typescript-eslint/no-var-requires */
import passport from 'passport';
import googlePassport from 'passport-google-oauth2';
import db from '../models';
const User = db.user;

export default function google() {
    passport.use(
        'google',
        new googlePassport.Strategy(
            {
                clientID: process.env.GOOGLE_ID2 as string,
                clientSecret: process.env.GOOGLE_PW2 as string,
                callbackURL: 'http://localhost:4000/auth/google/callback',
                passReqToCallback: true,
            },
            async (request: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
                try {
                    const exUser = await User.findOne({
                        where: {
                            //email: profile.emails[0].value,
                            //provider: 'google',
                            userId: profile.id,
                        },
                    });
                    console.log('111111');
                    if (exUser) {
                        console.log(exUser);
                        return done(null, exUser);
                    } else {
                        console.log('3333');
                        //const hashedPassword = await bcrypt.hash(profile.displayName, 11);
                        const newUser = await User.create({
                            // email: profile.emails[0].value,
                            userId: profile.id,
                            password: 'Google',
                            //nickname: profile.displayName,
                            //snsId: profile.id,
                            //provider: 'google',
                            expressionType: 1,
                            movementType: 1,
                        });
                        return done(null, newUser);
                    }
                } catch (err) {
                    console.error(err);
                    return done(err, null);
                }
            },
        ),
    );
}
