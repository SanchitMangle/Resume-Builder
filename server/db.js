import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => console.log("DB CONNECTED"))
        mongoose.connect(`${process.env.MONGODB_URI}/resume_builder`)
    } catch (error) {
        console.log(error.message);

    }
}

export default connectDB;