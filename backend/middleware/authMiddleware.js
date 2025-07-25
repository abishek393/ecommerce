import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(404).json({message: "Token was not find"});
    }

    jwt.verify(token, process.env.SECRET_KEY, async(err, decoded)=>{
        if(err){
            return res.status(400).json({message:"Invalid token"});
        }
        else{
            const userData = await User.findById(decoded.id);
            if(!userData){
                return res.status(404).json({message:"No use with the token"})
            }

            req.user = userData;
            next()
        }
    })
}