import mongoose from "mongoose";

const userScheema = new mongoose.Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, enum:["user", "admin", "superAdmin"], default:"user"}
})

const User =  mongoose.model("user", userScheema);

export default User;
