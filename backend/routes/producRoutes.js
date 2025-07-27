import {Router} from "express";
import { createProduct, getAllProducts, singleProduct, updateProduct, deleteProduct } from "../controller/productController.js";
import { multer, storage} from "../middleware/multerMiddleware.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import errorHandler from "../services/errorHandler.js"


const upload = multer({storage: storage});
const router = Router();

router.route("/create").post(isAuthenticated, upload.single('image'), errorHandler(createProduct))
router.route("/getAll").get(errorHandler(getAllProducts));
router.route("/getSingle/:id").get(errorHandler(singleProduct));
router.route("/updateProduct/:id").patch(updateProduct  );
router.route("/deleteProduct/:id").delete(deleteProduct);

export default router;