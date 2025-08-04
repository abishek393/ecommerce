import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    paymnetMethod: { type: String, enum: ["COD", "khalti"] },
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String },
    pidx: { type: String, default: null }
}, {timestamps: true})

const Payment = mongoose.model("payment", paymentSchema);

export default Payment;

