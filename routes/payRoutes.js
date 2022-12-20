import express from "express";
import {
	createPaymentWithBKash,
	paySuccess,
} from "../controllers/payControllers.js";
import { auth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.route("/:id").get(auth, createPaymentWithBKash);
router.route("/success/:id").post(paySuccess);

export default router;
