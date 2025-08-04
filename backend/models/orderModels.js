import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    products:
        [{
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true }
        }

        ],

    shippingAddress: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    paymnetMethod: { type: String, enum: ["COD", "khalti"] },
    orderStatus: { type: String, enum: ['pending', 'ontheway', 'delivered', 'cancalled'], default: 'pending' }
}, { timestamps: true });

const Order = mongoose.model("order", orderSchema);

export default Order;