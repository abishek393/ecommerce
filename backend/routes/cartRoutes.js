import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {addToCart, deleteCartItem, getCartItem, updateCartItems} from "../controller/cartController.js"
import errorHandle from "../services/errorHandler.js";

const router = Router();

router.route("/").post(isAuthenticated, errorHandle(addToCart))
.get(isAuthenticated, errorHandle(getCartItem))
.patch(isAuthenticated, updateCartItems)
.delete(isAuthenticated, deleteCartItem)

export default router;