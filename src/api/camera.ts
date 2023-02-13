import { Container } from 'typedi';
import express from 'express';
import cors from 'cors';
import upload from '../loaders/multer';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cameraService from '../services/camera';

const route = express.Router();

route.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.post('/:userId', upload.single('file'), async (req, res) => {
    const expressionDto = JSON.parse(req.body.expressionData);

    if (req.file == null) {
        return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.camera.upload_error });
    }
    expressionDto['videoUrl'] = req.file['key'];
    expressionDto['userId'] = req.params.userId;

    cameraService.postCamera(expressionDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.CREATED).send();
    });
});

route.get('/usim/:userId', (req, res) => {
    cameraService.getUsim(req.params.userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.usim_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
