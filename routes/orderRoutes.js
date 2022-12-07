import express from "express";
import {
	createOrder,
	getSingleOrder,
	getUserAllOrder,
} from "../controllers/orderControllers.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(auth, createOrder);
router.route("/:id").get(auth, getSingleOrder);
router.route("/mine/orders").get(auth, getUserAllOrder);

export default router;
