import 'reflect-metadata';
import Logger from '../loaders/logger';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

import config from '../config';

const s3 = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.access_key_id,
        secretAccessKey: config.aws.secret_access_key,
    },
});

const dateFormat = (now): string => {
    return now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate();
};

const timeFormat = (now): string => {
    return now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
};

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucket_name,
        key: function (req, file, cb) {
            // 파일 포맷 유효성 검사
            const format = file.originalname.split('.').slice(-1)[0];
            const now = new Date();
            if (!['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webm', 'mp4'].includes(format)) {
                Logger.error('Invalid file format.');
                return cb(new Error('Only images are allowed'));
            }
            Logger.info(`File uploaded successfully.`);
            cb(null, `${dateFormat(now)}/${timeFormat(now)}.${format}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

export default upload.single('file');
