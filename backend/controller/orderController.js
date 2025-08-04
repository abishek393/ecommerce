import Order from "../models/orderModels.js";
import mongoose from "mongoose";

export const makeOrder = async (req, res) => {
    const userId = req.user.id;
    
    
    if(!userId){
        return res.status(402).json({message:"no user id found"})
    }
    const {products, shippingAddress, phoneNumber, totalAmount, paymentMethod, orderStatus}= req.body;
    if(!products|| !products.length ===0|| !shippingAddress || !phoneNumber|| !totalAmount || !paymentMethod || !orderStatus){
        return res.status(401).json({message: "Please enter all the required fields"})
    }
      

    const newOrder = await Order.create({
        userId, 
        products,
        shippingAddress,
        phoneNumber,
        totalAmount,
        paymentMethod,
        orderStatus
        
    })
    res.status(200).json({message: "order created sucessfully", data: newOrder})
}


export const getAllOrder =async (req, res) => {
    const orders = await Order.find();
    if(!orders){
        return res.status(404).json({message: "No orders till the date"})
    }
    res.status(200).json({message:" sucessfullly fetched the order", data: orders})
}

export const getSingleOrder = async (req, res) => {
    
    const {id} = req.params;
    const singleOrder = await Order.findById(id);
    if(!singleOrder){
        return res.status(404).json({message:"No order found"})
    }
    res.status(200).json({message:"Sucessfully fetched single order", data: singleOrder})

}

export const getMyorder = async (req, res) =>{
    
    const userId = req.user.id;
    const order = await Order.find({userId});
    if(!order){
        return res.status(404).json({message: "No order found"})
    }
    res.status(200).json({message:"Sucessfully fetched order", data: order})
}

/// for admin 
export const updateOrderStatus = async(req, res) => {
    const {id} = req.params;
    const {orderStatus} = req.body;

    if(!id){
        return res.status(400).json({message: "NO order if found to update"})
    }
    if(!orderStatus){
        return res.status(400).json({message:"Enter order status"})
    }

    const updatedOrderStatus = await Order.findByIdAndUpdate(id, {orderStatus}, {new:true});
    if(!updatedOrderStatus){
        return res.status(404).json({message:"Cannot update the orderStatus"})
    }

    return res.status(200).json({messsage: "order status updated sucessfully", data: updatedOrderStatus})
}

export const deleteOrder = async (req, res) => {
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message: "No order id found"})
    }

    const deletedOrder = await Order.findByIdAndDelete(id);
    if(!deletedOrder){
        return res.status(404).json({message: "NO items deleted"})
    }
    res.status(200).json({message: "Order deleted sucessfully"})
}

export const cancleOrder = async (req, res) =>{
    const {id} = req.params;
    const orders = await Order.findById(id);
    if(!orders){
        return res.status(400).json({message: "NO order found"})
    }
    if(orders.orderStatus ==="pending"){
        orders.orderStatus ="cancalled";
        await orders.save();
    }
    else{
        return res.status(401).json({message: "order must be in pending stage to cancle"})
    }
    res.status(200).json({message: "Order canclled sucessfully", data: orders})
}