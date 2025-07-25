import {Router} from "express";
import { createProduct } from "../controller/productController.js";
import { multer, storage,} from "../middleware/multerMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";


const upload = multer({storage: storage});
const router = Router();

router.route("/create").post(isAuthenticated, createProduct);

export default router;