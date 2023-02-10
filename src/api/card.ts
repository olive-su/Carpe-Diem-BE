import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cardService from '../services/card';

const route = express.Router();

route.get('/', async (req: Request, res: Response) => {
    const userId = req.get('userId');

    cardService.getCard(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
