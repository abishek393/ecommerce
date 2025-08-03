import mongoose from "mongoose";
import Cart from "../models/cartModels.js";

export const addToCart = async (req, res) => {
    const userId = req.user.id;

    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Product id is not valid" })
    }

    if (!productId || !quantity) {
        return res.status(404).json({ message: "Missing productId or quantity" })
    }

    let cartItem = await Cart.findOne({ userId, productId });
    if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
    }
    else {
        cartItem = Cart.create({ userId, productId, quantity })
    }

    res.status(200).json({ message: "Sucessfully added item to your cart!!!", data: cartItem })

}

export const getCartItem = async (req, res) => {
    const userId = req.user.id;
    const cartItems = await Cart.find({ userId }).populate("productId");
    if (cartItems.length === 0) {
        return res.status(400).json({ message: "No items in your cart" });
    }
    res.status(200).json({ message: "Sucessfully fetched cart items", data: cartItems })
}

export const updateCartItems = async (req, res) => {
    const userId = req.user.id;

    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ message: "No productId or quantity" })
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(401).json({ message: "Invalid productId" })
    }

    let cartItem = await Cart.findOne({ userId, productId });
    if (!cartItem) {
        return res.status(404).json({ message: "No cartItem" })
    }

    cartItem.quantity = quantity;
    await cartItem.save();
    return res.status(200).json({ message: "sucessfully updated cartItems", data: cartItem })
}

export const deleteCartItem = async (req, res) =>{
    const userId = req.user.id;
    const productId = req.body.productId;

    if(!productId){
        return res.status(401).json({message: "Please enter the product id!!"})
    }

    if(!mongoose.Types.ObjectId.isValid(productId)){
        return res.status(400).json({message: "The product id is not in valid format"})
    }

    const deletedCartItem = await Cart.findOneAndDelete({userId, productId})

    if(!deletedCartItem){
        return res.status(404).json({message:"NO items found to delete"})
    }

    return res.status(200).json({message: "cart item sucessfully deletd"})

}