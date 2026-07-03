import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URL);

        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB");
        console.error(error.message);

        process.exit(1);
    }
};

export default connectDB;