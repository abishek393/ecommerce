import {Router} from "express";
import { userRegister, userLogin, getAllUser, singleUser, profile,updateUser, deleteUser} from "../controller/userController.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/getAll").get(getAllUser);
router.route("/singleUser/:id").get(singleUser)
router.route("/profile").get(profile);
router.route("/updateUser/:id").patch(updateUser);
router.route("/deleteUser/:id").delete(deleteUser);

export default router;