import { Router } from "express";
import { cancleOrder, deleteOrder, getAllOrder, getMyorder, getSingleOrder, makeOrder, updateOrderStatus } from "../controller/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandle from "../services/errorHandler.js";

const router = Router();

router.route("/").post(isAuthenticated, errorHandle(makeOrder))
.get(isAuthenticated, getAllOrder)

router.route("/myorders").get(isAuthenticated, errorHandle(getMyorder))

router.route("/:id").get(isAuthenticated, errorHandle(getSingleOrder))
.patch(isAuthenticated, errorHandle(updateOrderStatus))
.delete(isAuthenticated, deleteOrder)
.post(isAuthenticated, cancleOrder)



export default router;