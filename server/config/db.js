import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => logger.info("DB connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/resume_builder`)
    } catch (error) {
        logger.error({ err: error.message }, "DB connection failed");
        throw error;

    }
}

export default connectDB;