import express from "express";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/producRoutes.js";
const app = express();
dotenv.config();
const port = process.env.port || 3000;

connectDB();
app.use(express.json());
app.use(express.static("./storage"));
app.use("/api", userRouter);
app.use("/api/product", productRouter);

app.listen(port, ()=>{
    console.log(`Server is connected to the port ${port}`);
    
})  