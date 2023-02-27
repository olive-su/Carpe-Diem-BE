import { Container } from 'typedi';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { uploadImg } from '../loaders/multer';
import expressRequest from '../types/expressRequest';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import usimService from '../services/usim';

const route = express.Router();

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post('/', uploadImg.array('imgs', 3), async (req: Request, res: Response) => {
    console.log(req.files);
    if (!req.user) {
        return res.status(statusCode.UNAUTHORIZED).json({ message: responseMessage.auth.unauthorized });
    }
    if (!req.files) {
        return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.camera.upload_error });
    }

    const userId = req.user.user_id;
    const usimDto = {};
    const imgs = req.files;
    const img1 = imgs[0];
    const img2 = imgs[1];
    const img3 = imgs[2];
    let userImgUrl: string = img1['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    console.log('111111111111111111111111111111111111111');
    usimService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
    userImgUrl = img2['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    console.log('111111111111111111111111111111111111111');
    usimService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
    userImgUrl = img3['key'];
    usimDto['userId'] = userId;
    usimDto['userImgUrl'] = userImgUrl;
    console.log('111111111111111111111111111111111111111');
    usimService.postUsim(usimDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
