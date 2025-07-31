import {Router} from "express";
import {createWishlist, getWishlist, removeProductFromWishList} from "../controller/wishListController.js";
import {isAuthenticated} from "../middleware/authMiddleware.js";
import errorHandle from "../services/errorHandler.js";

const router = Router();

router.route("/create").post(isAuthenticated, errorHandle(createWishlist));
router.route('/getAll').get(isAuthenticated, getWishlist);
router.route('/delete').patch(isAuthenticated, removeProductFromWishList);

export default router;