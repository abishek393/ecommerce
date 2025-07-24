import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    try {
        const { userName, email, password, role } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please input all the fields" })
        }

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(401).json({ message: "The email you provide is already registered" })
        }

        const hassedPassword = await bcrypt.hash(password, 11)
        const newUser = await User.create({
            userName,
            email,
            password: hassedPassword,
            role
        })
        return res.status(200).json({ message: "User created sucessfully", data: newUser })

    }


    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }

}
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all the fields" })
        }
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({ message: "No user register with this email" })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Password is not correct" })
        }


        const payload = { id: existingUser.id, role: existingUser.role };
        console.log(payload);
        console.log(process.env.SECRET_KEY);


        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })
        console.log(token);


        return res.status(200).json({ message: "User login successfully", token, data: existingUser })

    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", err })
    }



}

export const getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
        if (!allUser) {
            return res.status(404).json({ message: "no user found" })
        }

        return res.status(200).json({ message: "User fetched sucessfully ", data: allUser })


    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const singleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const oneUser = await User.findById(id);
        return res.status(200).json({ message: "single user ", data: oneUser })
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }


}

export const profile = async (req, res) => {
    try {
        const id = req.user.id;

        const user = await User.findById(id);
        if (!user) {
            return res.staus(404).json({ message: "NO user found" })
        }

        return res.status(200).json({ message: "User is fetched secessfully", data: user })
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
}


export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { userName } = req.body;



        const existingUser = await User.findOne({ userName });


        if (existingUser) {
            return res.status(400).json({ message: "UserName is already taken, use other!!" })
        }

        const newUser = await User.findByIdAndUpdate(id, userName, { new: true });


        return res.status(200).json({ message: "User updated sucessfully", data: newUser })
    }


    catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteUser = async (req, res) => {
    try {
        
        
        const {id} = req.params;
        
        const user = await User.findByIdAndDelete(id);
        
        if(!user) {
            return res.status(400).json({ message: "cannot find user" })
        }
        return res.status(200).json({ message: "User deleted sucesfully" })
    }

    catch (err) {
        return res.status(500).json({ error: "Internal server error" })
    }
}