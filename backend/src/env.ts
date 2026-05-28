import dotenv from 'dotenv';
dotenv.config();

export const env = {
    BCRYPT_SALT: process.env.BCRYPT_SALT,
    DEV_ENV: process.env.DEV_PORT,
    DB_URI: process.env.MONGO_DB_URI,
}