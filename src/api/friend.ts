import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import userService from '../services/user';
import expressRequest from '../types/expressRequest';
import friendService from '../services/friend';

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

route.get('/', (req: Request, res: Response) => {
    friendService.getFriendList(req.user.email, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.friend.email_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
