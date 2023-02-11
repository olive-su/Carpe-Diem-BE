// import ExpressionModel from '../models';
import Logger from '../loaders/logger';
import db from '../models';

const Card = db.card;

const getCards = async (userId, callback) => {
    await Card.findAll({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const getCard = async (cardId, callback) => {
    await Card.findOne({ where: { card_id: cardId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

const destroyCard = async (cardId, callback) => {
    await Card.destroy({ where: { card_id: cardId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, 'DELETE CARD OK');
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { getCards, getCard, destroyCard };
