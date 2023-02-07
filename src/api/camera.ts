import { Container } from 'typedi';
import express, { Request, Response } from 'express';
import upload from '../loaders/multer';

// import CameraService from '../services/camera';
import responseMessage from '../constant/responseMessage';

const router = express.Router();

router.post('/video', upload, async (req: Request, res: Response) => {
    // const cameraServiceInstance = Container.get(CameraService);
    if (req.file == null) {
        return res.status(400).json({ message: responseMessage.camera.upload_error });
    }
    // await cameraServiceInstance.uploadVideo(req.file);
    res.status(201);
});

export default router;
