// import ExpressionModel from '../models';
import Logger from '../loaders/logger';
import db from '../models';

const Expression = db.expression;

const postCamera = async (expressionDto, callback) => {
    const expressionData = {
        userId: expressionDto.user_id,
        expression: expressionDto.expression,
        accuracy: expressionDto.accuracy,
        time: expressionDto.time,
        videoUrl: expressionDto.video_url,
    };
    const expression = await Expression.create(expressionData).catch((err) => {
        Logger.error(err);
        return callback(err);
    });
    Logger.info(`Success! ${expression}`);
};

export default { postCamera };
