import Category from "../models/categoryModel.js";

export const createCategory =async (req, res) => {
    const userId = req.user.id;
    const {categoryName} = req.body;

    const existingCategoryName = Category.findOne(categoryName)
    if(existingCategoryName){
        return res.status(409).json({message: "category name already exist"})
    }

    const newCatagory = await Category.create({
        categoryName,
        userId
    })
    res.status(200).json({message:"New catagory created sucessfullt", data:newCatagory})
}

export const getAllCategory =async (req, res) =>{
    const allCategory = await Category.find();
    if(!allCategory){
        return res.status(400).json({message: "Category is empty"})
    }
    res.status(200).json({message:"Sycessfully fetched all category", data: allCategory})
}

export const singleCategory =async (req, res) =>{

    const {id} = req.params;
    const category = await Category.findById(id);
    if(!category){
        return res.status(404).json({message:"no category found with the id"})
    }
    return res.status(200).json({message:"sucessfully fetched single category", dataL:category})
}
export const updateCategory = async (req, res) => {
        
    const { id } = req.params;
    const { categoryName } = req.body;
 
    const updateCategory = await Category.findByIdAndUpdate(id, {categoryName}, {new: true})
    
    if (!updateCategory) {
        return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: "Category update successfully", data: updateCategory })
}

//delete product
export const deleteCategory= async(req, res)=>{
    const{id}=req.params;
    const category= await Category.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({ message: "Category not found" })
    }
    res.status(200).json({ message: "Category deleted successfully"})

}