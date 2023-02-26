import { Op, Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Usim = db.usim;

const postUsim = async (img, callback) => {
    const usimData = {
        userId: img.userId,
        userImgUrl: img.userImgUrl,
    };
    const usim = await Usim.create(usimData).catch((err) => {
        Logger.error(err);
        return callback(err);
    });
    Logger.info(`Success! ${usim}`);
};

export default { postUsim };
