import {Router} from "express";
import { createCategory } from "../controller/categoryController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = Router();
router.route('/').post(isAuthenticated, createCategory);

export default router;

