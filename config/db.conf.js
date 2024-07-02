import dotenv from 'dotenv';

dotenv.config();

export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_APPNAME = process.env.DB_APPNAME;

export const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@dev-db.3tzynec.mongodb.net/?retryWrites=true&w=majority&appName=${DB_APPNAME}`;