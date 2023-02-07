import { Container } from 'typedi';
import express, { Request, Response } from 'express';
import multer from 'multer';

import CameraService from '../services/camera';
import responseMessage from '../constant/responseMessage';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/video', upload.single('file'), async (req: Request, res: Response) => {
    const cameraServiceInstance = Container.get(CameraService);
    if (req.file == null) {
        return res.status(400).json({ message: responseMessage.camera.upload_error });
    }
    await cameraServiceInstance.uploadVideo(req.file);
    res.status(201);
});

router.post('/', async (req: Request, res: Response) => {
    const cameraServiceInstance = Container.get(CameraService);
    if (req.file == null) {
        return res.status(400).json({ message: responseMessage.camera.expression_error });
    }
    await cameraServiceInstance.uploadVideo(req.file);
    res.status(201);
});

export default router;
