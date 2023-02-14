import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import albumService from '../services/album';

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended: true }));

route.get('/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;

    albumService.getAlbums(userId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.get('/:userId/:albumId', async (req: Request, res: Response) => {
    const albumId = req.params.albumId;

    albumService.getAlbum(albumId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

route.delete('/:userId/:albumId', async (req: Request, res: Response) => {
    const albumId = req.params.albumId;

    albumService.deleteAlbum(albumId, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.album.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
