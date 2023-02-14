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

const deleteAlbum = async (albumId, callback) => {
    await Album.destroy({ where: { album_id: albumId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, 'DELETE ALBUM OK');
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getAlbum = async (albumId, callback) => {
    await Album.findOne({ where: { album_id: albumId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const putAlbum = async (albumDto, callback) => {
    await Album.update(
        {
            userId: albumDto.user_id,
            cardId: albumDto.card_id,
            albumId: albumDto.album_id,
            title: albumDto.title,
            coverImgUrl: albumDto.thumbnail_url,
        },
        { where: { albumId: albumDto.album_id } },
    )
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, 'UPDATE ALBUM OK');
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { getAlbums, getAlbum, deleteAlbum, putAlbum };
