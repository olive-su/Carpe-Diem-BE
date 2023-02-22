import passportGoogleOauth2 from 'passport-google-oauth2';

import Logger from '../../loaders/logger';
import config from '../../config';
import authService from '../../services/auth';

const GoogleStrategy = passportGoogleOauth2.Strategy;

// Define Google AOuth Passport
export default new GoogleStrategy(
    {
        clientID: config.google.client_id,
        clientSecret: config.google.client_secret_key,
        callbackURL: config.google.redirect_uri,
    },
    function (accessToken, refreshToken, profile, cb) {
        const userData = {
            user_id: profile.id,
            email: profile.emails[0].value,
            nickname: profile.displayName,
        };
        console.log(userData);
        try {
            authService.validateUser(userData.user_id, async (err, data) => {
                if (!data) {
                    authService.signUp(userData, async (err, data) => {
                        Logger.info(`[googleLogin signUp] ${userData}`);
                        return cb(null, userData);
                    });
                } else {
                    Logger.info(`[googleLogin] ${userData}`);
                    return cb(null, userData);
                }
            });
        } catch (err) {
            Logger.error(`[googleLogin] ${err}`);
            return cb(err);
        }
    },
);
