import express, { Request, Response } from 'express';

import statusCode from '../common/constant/statusCode';
import responseMessage from '../common/constant/responseMessage';

import mailSender from '../loaders/mail';

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

route.get('/', (req, res) => {
    const { email } = req.body;

    const emailParam = {
        toEmail: email, // 수신할 이메일

        subject: 'New Email From CarpeDiem', // 메일 제목

        text: `CarpeDiem 회원님!`, // 메일 내용
    };

    mailSender.sendGmail(emailParam);

    res.status(statusCode.OK).send('성공');
});

export default route;
