// import ExpressionModel from '../models';
import Logger from '../loaders/logger';
import db from '../models';

const Album = db.album;

const getAlbums = async (userId, callback) => {
    await Album.findAll({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { getAlbums };
