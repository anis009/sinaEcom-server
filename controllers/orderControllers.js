import Order from "../models/order.js";
import asyncHandler from "express-async-handler";

// @desc Create order
// @route POST /api/order
// @access Public

export const createOrder = async (req, res) => {
	try {
		const saveOrder = new Order(req.body);
		await saveOrder.save();
		res.json(saveOrder);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

// @desc get signle order by id
// @route POST /api/order/:id
// @access Private

export const getSingleOrder = async (req, res) => {
	const id = req.params.id;

	try {
		const order = await Order.findById(id).populate("user");
		if (!order) {
			throw new Error("Order is not exist");
		}
		res.json(order);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

// @desc get all order by user
// @route POST /api/order/mine
// @access Private

export const getUserAllOrder = async (req, res) => {
	const id = req.user._id;
	console.log(id);
	try {
		const orders = await Order.find({ user: id })
			.sort({ createdAt: -1 })
			.populate("user");
		if (orders.length < 1) {
			throw new Error("there are no orders");
		}
		res.json(orders);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};
