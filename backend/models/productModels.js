import mongoose from "mongoose";

const productScheema = new mongoose.Schema({
    productName: { type: String, require: true },
    productDescription: { type: String, require: true },
    productPrice: { type: Number, required: true },
    productTotalStockQuantity: { type: Number, required: true },
    productImageUrl: { type: String },
    totalRating: { type: Number },
    category: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productScheema);

export default Product;