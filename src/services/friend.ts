import { Op } from 'sequelize';

import Logger from '../loaders/logger';
import db from '../models';

const Friend = db.friend;
const User = db.user;

const getFriendList = async (userEmail, callback) => {
    await Friend.findAll({ where: { user_email: userEmail } })
        .then(async (result) => {
            const friendEmails = result.map((r) => r.friendEmail);

            const friends = await User.findAll({
                attributes: ['email', 'nickname', 'profile_img'],
                where: { email: { [Op.in]: friendEmails } },
            });

            Logger.info(`Success! ${friends}`);
            callback(null, friends);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { getFriendList };
