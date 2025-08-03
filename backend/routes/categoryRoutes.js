import {Router} from "express";
import { createCategory, getAllCategory, singleCategory, updateCategory, deleteCategory} from "../controller/categoryController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandle from "../services/errorHandler.js";

const router = Router();
router.route('/').post(isAuthenticated, createCategory)
.get(isAuthenticated, getAllCategory)

router.route("/:id").get(singleCategory)
.patch(isAuthenticated, updateCategory)
.delete(isAuthenticated, deleteCategory )
export default router;

