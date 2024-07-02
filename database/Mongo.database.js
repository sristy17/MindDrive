import mongoose from "mongoose";
import { MONGODB_URI } from "../config/db.conf.js";

const connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(MONGODB_URI);

    mongoose.connection.on('connected', () => {
        console.log("Database connected successfully");
    });

    mongoose.connection.on('disconnected', () => {
        console.log("Database Disconnected");
    });

    mongoose.connection.on('error', (error) => {
        console.error('Error connecting the database', error);
    });
}

export default connectDatabase;
