import express from "express";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js"
const app = express();
dotenv.config();
const port = process.env.port || 3000;

connectDB();
app.use(express.json());
app.use("/api", userRouter);

app.listen(port, ()=>{
    console.log(`Server is connected to the port ${port}`);
    
})  