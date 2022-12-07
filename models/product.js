import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
		},
		comment: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	}
);

const productSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		image: [],
		brand: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			default: 4.5,
		},
		reviews: [reviewSchema],
		numReviews: {
			type: Number,
			default: 1,
		},
		price: {
			type: Number,
			required: true,
		},
		countInStock: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
