import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import userService from '../services/user';

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

route.get('/:userId', (req, res) => {
    userService.getUserInfo(req.params.userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.user.user_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.put('/:userId', async (req: Request, res: Response) => {
    let userDto = req.body;
    userDto = { user_id: req.params.userId, ...userDto };
    console.log(userDto);

    userService.putUserInfo(userDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.user.update_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
