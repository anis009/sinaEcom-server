import express from "express";
import {
	createProduct,
	createReview,
	getProduct,
	getProducts,
	getTopProducts,
	updateProduct,
} from "../controllers/productControllers.js";
import { admin, auth } from "../middleware/authMiddleware.js";
const router = express.Router();

// /api/products/

router.route("/").post(auth, admin, createProduct).get(getProducts);
router.route("/top").get(getTopProducts);
router.route("/:id").get(getProduct).put(auth, admin, updateProduct);
// /api/products/review/:id
router.route("/review/:id").post(auth, createReview);

export default router;
