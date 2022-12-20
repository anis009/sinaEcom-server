import fs from "fs";
import Product from "../models/product.js";
import asyncHandler from "express-async-handler";

// @desc Create Product
// @route POST /api/posts
// @access private/admin

export const createProduct = asyncHandler(async (req, res) => {
	const {
		name,
		brand,
		category,
		description,
		rating,
		numReviews,
		price,
		countInStock,
		user,
		image,
	} = req.body;

	const product = new Product({
		user,
		name,
		brand,
		category,
		description,
		rating,
		numReviews,
		price,
		countInStock,
		image,
	});
	const createProduct = await product.save();
	res.status(201).json(createProduct);
});

//@desc Fetch all products...
//@route GET /api/products....
//@access Public

export const getProducts = asyncHandler(async (req, res) => {
	const pageNumber = req.query.pageNumber;
	const itemLimit = 8;
	let keyWord = req.query.keyWord;
	console.log(keyWord);
	keyWord = keyWord
		? {
				name: {
					$regex: keyWord,
					$options: "i",
				},
		  }
		: {};
	const totalItems = await Product.countDocuments();
	const pageSize = Math.ceil(totalItems / itemLimit);
	const products = await Product.find({ ...keyWord })
		.populate("user", "name")
		.sort({ createdAt: -1 })
		.limit(itemLimit)
		.skip(itemLimit * (pageNumber - 1));

	res.json({ products, pageSize, pageNumber });
});

//@desc Fetch single product...
//@route GET /api/products/:id....
//@access private/admin

export const getProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	if (!product) {
		throw new Error("Product not found");
	}
	res.json(product);
});

//@desc Update single product...
//@route put /api/products/:id....
//@access private/admin

export const updateProduct = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const product = await Product.findById(id);
	if (!product) {
		throw new Error("Product Not Found!");
	}
	const {
		name,
		brand,
		category,
		description,
		rating,
		price,
		countInStock,
		image,
	} = req.body;
	product.name = name || product.name;
	product.brand = brand || product.brand;
	product.category = category || product.category;
	product.description = description || product.description;
	product.rating = rating || product.rating;
	product.price = price || product.price;
	product.countInStock = countInStock || product.countInStock;
	product.user = req.user._id;
	product.image.unshift({
		name: image,
	});
	product.image.pop();
	const deleteImage = product.image[0].name;
	const updatedProduct = await product.save();
	if (updatedProduct) {
		res.json({
			message: "product updated successfully",
		});
	}
});

//@desc create review product...
//@route put /api/products/reviews/:id....
//@access private

export const createReview = async (req, res) => {
	const { comment, rating } = req.body;
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			throw new Error("Product is not found !");
		}

		const existReview = product.reviews.findIndex(
			(review) => review.user.toString() === req.user._id.toString()
		);
		if (existReview !== -1) {
			throw new Error("you have already reviewed this product");
		}

		let calRating =
			Number(product.numReviews) * Number(product.rating) + Number(rating);
		calRating = Number(calRating) / (Number(product.numReviews) + 1);
		product.rating = calRating.toFixed(1);
		product.numReviews = product.numReviews + 1;
		product.reviews.push({
			user: req.user._id,
			comment,
			name: req.user.name,
			rating,
		});
		await product.save();
		res.json(product);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

//@desc get review product...
//@route put /api/products/reviews/
//@access public

export const getReview = async (req, res) => {
	try {
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

//@desc get top products...
//@route put /api/products/top/
//@access public

export const getTopProducts = async (req, res) => {
	try {
		const products = await Product.find().sort({ rating: -1 }).limit(5);
		res.json(products);
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
};
