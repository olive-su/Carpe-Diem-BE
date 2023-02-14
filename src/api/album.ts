import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';
import albumService from '../services/album';

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

route.put('/:userId/:albumId', async (req: Request, res: Response) => {
    let albumDto = req.body;
    albumDto = { user_id: req.params.userId, album_id: req.params.albumId, ...albumDto };
    console.log(albumDto);

    albumService.putAlbum(albumDto, (err, data) => {
        if (err) res.status(statusCode.INTERNAL_SERVER_ERROR).send({ err: err, message: responseMessage.card.server_error });
        else res.status(statusCode.OK).send(data);
    });
});

export default route;
