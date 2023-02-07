import 'reflect-metadata';
import { Service, Inject } from 'typedi';
import Logger from '../loaders/logger';
import AWS from 'aws-sdk';
import fs from 'fs';

import config from '../config';

@Service()
export default class CameraService {
    public async uploadVideo(file): Promise<any> {
        const logger = Logger;
        const s3 = new AWS.S3({
            accessKeyId: config.aws.access_key_id,
            secretAccessKey: config.aws.secret_access_key,
            region: config.aws.region,
        });
        const fileStream = fs.createReadStream(file.path);

        const params = {
            Bucket: config.aws.bucket_name,
            Key: file.originalname,
            Body: fileStream,
        };

        s3.upload(params, (err, data) => {
            console.log('data', data);
            if (err) {
                logger.error(err);
                throw err;
            }
            logger.info(`File uploaded successfully. ${data.Location}`);
        });
    }
}
