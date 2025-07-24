import mongoose from "mongoose";


const connectDB = async () => {
    console.log(`This is mongodburl ${process.env.MONGODB_URL}`);
    mongoose.connection.on("connected", () => {
        console.log("Connected to the mongodb server");
        



    })

    await mongoose.connect(`${process.env.MONGODB_URL}`)
}

export default connectDB;