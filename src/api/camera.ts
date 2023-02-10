import { Container } from 'typedi';
import express, { Request, Response } from 'express';
import upload from '../loaders/multer';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import cameraService from '../services/camera';

const route = express.Router();

route.post('/', upload.single('file'), async (req: Request, res: Response) => {
    const expressionDto = JSON.parse(req.body.expressionData);

    if (req.file == null) {
        return res.status(statusCode.BAD_REQUEST).json({ message: responseMessage.camera.upload_error });
    }

    expressionDto['video_url'] = req.file['key'];

    cameraService.postCamera(expressionDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.camera.expression_error });
        else res.status(statusCode.CREATED).send();
    });
});

export default route;
