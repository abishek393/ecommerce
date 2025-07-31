import mongoose from "mongoose";

const wishlistScheema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref: "User", require:true},
    products:[{type: mongoose.Schema.Types.ObjectId, ref: "Product", require:true}],
}, {timestamps:true})

const Wishlist = mongoose.model("wishlist", wishlistScheema);

export default Wishlist;