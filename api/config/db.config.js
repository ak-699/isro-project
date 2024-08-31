import mongoose from "mongoose"

// console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MONGO")
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;