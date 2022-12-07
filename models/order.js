import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderItems: [],
		shippingPrice: {
			type: Number,
			default: 0,
		},
		taxPrice: {
			type: Number,
			default: 0,
		},
		totalPrice: {
			type: Number,
			default: 0,
		},
		shippingAddress: {
			city: {
				type: String,
				required: true,
			},
			address: {
				type: String,
				required: true,
			},
			postalCode: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
		},
		paymentMethod: {
			type: String,
			required: true,
		},
		isDelivered: {
			type: Boolean,
			default: false,
		},
		isPaid: {
			type: Boolean,
			default: false,
		},
		paidAt: Date,
		deliveredAt: Date,
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
