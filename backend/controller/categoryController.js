import Category from "../models/categoryModel.js";

export const createCategory =async (req, res) => {
    const userId = req.user.id;
    const {categoryName} = req.body;

    const newCatagory = await Category.create({
        categoryName,
        userId
    })
    res.status(200).json({message:"New catagory created sucessfullt", data:newCatagory})
}