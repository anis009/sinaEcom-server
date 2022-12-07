import express from "express";
import {
	authUser,
	forgotPassword,
	registerUser,
	resetPassword,
	updateUser,
} from "../controllers/userControllers.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser).put(auth, updateUser);
router.route("/login").post(authUser);
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

export default router;
