import Product from "../models/productModels.js";

export const createProduct = async (req, res) => {

    const userId = req.user.id;

    const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;
    let productImgUrl;


    if (req.file) {
        productImgUrl = `${req.file.filename}`;
    }

    const existingProduct = await Product.findOne({ productName });

    if (existingProduct) {
        return res.status(400).json({ message: "Product whith this name already exist" })
    }

    const products = await Product.create({
        productName,
        productDescription,
        productPrice,
        productTotalStockQuantity,
        productImgUrl,
        totalRating,
        category,
        userId

    })
    return res.status(200).json({ message: "Product created sucessfully", data: products });
}

export const getAllProducts = async (req, res) => {
    const allProducts = await Product.find();
    return res.status(200).json({ message: "All product fetched sucessfullly", data: allProducts })
}

//single product

export const singleProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "No product found" })
    }

    res.status(200).json({ message: "Single product fetched sucessfully", data: product })
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category } = req.body;
    let productImgUrl;
    if (req.file) {
        productImgUrl = `${req.file.filename}`
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { productName, productDescription, productPrice, productTotalStockQuantity, totalRating, category, productImgUrl }, { new: true })
    if (!updatedProduct) {
        return res.status(404).json({ message: "No product found to update" })
    }
    return res.status(200).json({ message: "Product updated sucessfully", data: updatedProduct })
}

export const deleteProduct =async (req, res) => {    
    const {id} = req.params;      
    const product = await Product.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({message:"No product to delete with the id"})
    }
    return res.status(200).json({message: "Product deleted sucessfully"})
}