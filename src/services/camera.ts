// import ExpressionModel from '../models';
import Logger from '../loaders/logger';
import db from '../models';

const Expression = db.expression;
const Usim = db.usim;

const postCamera = async (expressionDto, callback) => {
    const expressionData = {
        userId: expressionDto.userId,
        expressionLabel: expressionDto.expressionLabel,
        expressionValue: expressionDto.expressionValue,
        expressionTime: expressionDto.expressionTime,
        videoUrl: expressionDto.videoUrl,
    };
    const expression = await Expression.create(expressionData).catch((err) => {
        Logger.error(err);
        return callback(err);
    });
    Logger.info(`Success! ${expression}`);
};

const getUsim = async (userId, callback) => {
    const usim = await Usim.findAll({ where: { user_id: userId } })
        .then((result) => {
            Logger.info(`Success! ${result}`);
            callback(null, result);
        })
        .catch((err) => {
            Logger.error(err);
            return callback(err);
        });
};

export default { postCamera, getUsim };
