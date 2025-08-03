import express from "express";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/producRoutes.js";
import wishlistRouter from "./routes/wishlistRouters.js";
import categoryRouter from "./routes/categoryRoutes.js";
import cartRouter from "./routes/cartRoutes.js"

const app = express();
dotenv.config();
const port = process.env.port || 3000;

connectDB();
app.use(express.json());
app.use(express.static("./storage"));
app.use("/api", userRouter);
app.use("/api/product", productRouter);
app.use("/api/wishlist", wishlistRouter );
app.use("/api/category", categoryRouter)
app.use("/api/cart", cartRouter)

app.listen(port, ()=>{
    console.log(`Server is connected to the port ${port}`);
    
})  