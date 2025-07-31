import Wishlist from "../models/addToWishlistModels.js";
import Product from "../models/productModels.js";

export const createWishlist = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.body;

    const product = await Product.findById(id);
    if (!product) {
        return res.status(404).json({ message: "No product found" })
    }

    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
        wishlist = await Wishlist.create({ userId, products: id })
    }
    else {
        if (wishlist.products.includes(id)) {
            return res.status(400).json({ message: 'Already in wishlist' })
        }
        wishlist.products.push(id);
        await wishlist.save();
    }
    return res.status(200).json({ message: "Sucessfully added to the wishlist", data: wishlist })
}

export const getWishlist = async (req, res) => {
    const userId = req.body.id;
    const wishlist = await Wishlist.findOne({userId}).populate("products");
    if(!wishlist){
        return res.status(401).json({message: "No wishlist found with the id"})
    }
    res.status(200).json({message:"wishlist fetched sucessfully", data: wishlist})

}

export const removeProductFromWishList = async (req, res) =>{
    const userId = req.user.id;
    const {productId} = req.body;
    
    const existingProduct = await Wishlist.findOne({products: productId});
    

    if(!existingProduct){
        return res.status(404).json({message:"NO product found with the productId"})
    }

    const wishlist = await Wishlist.findOneAndUpdate({userId}, {$pull :{products: productId}}, {new: true});
    if(!wishlist){
        return res.status(400).json({message:"No wishlist found"});
    }
    return res.status(200).json({message:"Product deleted sucessfully from the wishlist"})
}