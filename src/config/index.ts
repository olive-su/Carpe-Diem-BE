import dotenv from 'dotenv';

dotenv.config();

export default {
    host: process.env.HOST,
    port: process.env.PORT,
    client: {
        host: process.env.CLIENT_HOST,
        port: process.env.CLIENT_PORT,
    },
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        session: process.env.DB_SESSION_DATABASE,
        dialect: process.env.DB_DIALECT,
    },
    aws: {
        access_key_id: process.env.AWS_ACCESS_KEY_ID,
        secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
        bucket_name: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_REGION,
    },
    google: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret_key: process.env.GOOGLE_CLIENT_SECRET_KEY,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    },
};
