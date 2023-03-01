import { Sequelize } from 'sequelize';
import Logger from '../loaders/logger';
import db from '../models';

const Album = db.album;
const Card = db.card;

const getFriendAlbums = async (userId, callback) => {
    console.log(userId);
    await Album.findAll({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`[getFriendAlbums]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getFriendAlbums]Error', err);
            return callback(err);
        });
};

const getFriendAlbum = (albumDto, callback) => {
    Album.findOne({ where: { user_id: albumDto.user_id, album_id: albumDto.album_id } })
        .then((result) => {
            Logger.info(`[getFriendAlbum]Success! ${result}`);
            return callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getFriendAlbum]Error', err);
            return callback(err);
        });
};

const getFriendAlbumCard = async (cardId, callback) => {
    const cardIdMatchArray = cardId.map((cardId) => {
        return `card_id = ${cardId}`;
    });

    await Card.findAll({ where: Sequelize.literal(cardIdMatchArray.join(' OR ')) })
        .then((result) => {
            Logger.info(`[getFriendAlbumCard]Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error('[getFriendAlbumCard]Error', err);
            return callback(err);
        });
};

export default {
    getFriendAlbums,
    getFriendAlbum,
    getFriendAlbumCard,
};
