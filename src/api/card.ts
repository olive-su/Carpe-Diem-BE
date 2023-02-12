import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cardService from '../services/card';
import cors from 'cors';

const route = express.Router();

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;

    cardService.getCards(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/:userId/:cardId', async (req: Request, res: Response) => {
    const cardId = req.params.cardId;

    cardService.getCard(cardId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.delete('/:userId/:cardId', async (req: Request, res: Response) => {
    const cardId = req.params.cardId;

    cardService.destroyCard(cardId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/:userId/:cardId', async (req: Request, res: Response) => {
    let cardDto = req.body;
    cardDto = { user_id: req.params.userId, card_id: req.params.cardId, ...cardDto };
    console.log(cardDto);

    cardService.putCard(cardDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
