import { Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const User = db.user;

const signUp = (userDto, callback) => {
    User.create({
        userId: userDto.user_id,
        email: userDto.email,
        nickname: userDto.nickname,
    })
        .then((result) => {
            Logger.info(`회원가입이 정상적으로 처리되었습니다. ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { signUp };
