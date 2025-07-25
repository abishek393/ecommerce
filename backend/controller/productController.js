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