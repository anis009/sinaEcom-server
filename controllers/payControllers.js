import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import Order from "../models/order.js";

import mongoose from "mongoose";
import SSLCommerzPayment from "sslcommerz-lts";
dotenv.config("");

//@desc create payment..
//@route get /api/pay/:id
//@access private

const store_id = process.env.STORED_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

console.log(store_id);
console.log(store_passwd);

export const createPaymentWithBKash = async (req, res) => {
	const { id } = req.params;
	console.log(id);
	const order = await Order.findById(id).populate("user");
	console.log(order);
	if (!order) {
		res.status(404);
		throw new Error("Order Not Found!");
	}
	const transactionId = mongoose.Types.ObjectId().toString();
	const data = {
		total_amount: order?.totalPrice,
		currency: "USD",
		tran_id: mongoose.Types.ObjectId().toString(), // use unique tran_id for each api call
		success_url: `http://localhost:7070/api/pay/success/${id}?transactionId=${transactionId}`,
		fail_url: "http://localhost:3030/fail",
		cancel_url: "http://localhost:3030/cancel",
		ipn_url: "http://localhost:3030/ipn",
		shipping_method: "Courier",
		product_name: id,
		product_category: "Electronic",
		product_profile: "general",
		cus_name: order?.user?.name,
		cus_email: order?.user?.email,
		cus_add1: "Dhaka",
		cus_add2: "Dhaka",
		cus_city: order.shippingAddress.city,
		cus_state: "Dhaka",
		cus_postcode: order.shippingAddress.postalCode,
		cus_country: order.shippingAddress.country,
		cus_phone: order.phoneNumber,
		cus_fax: "01711111111",
		ship_name: order?.user.name,
		ship_add1: order.shippingAddress.address,
		ship_add2: "Dhaka",
		ship_city: order.shippingAddress.city,
		ship_state: "Dhaka",
		ship_postcode: order.shippingAddress.postalCode,
		ship_country: order.shippingAddress.country,
	};

	const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
	sslcz.init(data).then((apiResponse) => {
		// Redirect the user to payment gateway
		let GatewayPageURL = apiResponse.GatewayPageURL;
		res.json({
			url: GatewayPageURL,
		});
	});
};

export const paySuccess = async (req, res) => {
	const { id } = req.params;
	const transactionId = req?.query?.transactionId;

	try {
		console.log(
			"🚀 ~ file: payControllers.js:74 ~ paySuccess ~ transactionId",
			transactionId
		);
		const order = await Order.findById(id);
		if (!order) {
			res.status(404);
			throw new Error("Order Not Found!");
		}
		order.isPaid = true;
		order.transactionId = transactionId;
		const updatedOrder = await order.save();
		console.log(
			"🚀 ~ file: payControllers.js:88 ~ paySuccess ~ updatedOrder",
			updatedOrder
		);
		res.redirect("http://localhost:3001/profile");
	} catch (error) {
		res.status(403).json({
			message: error.message,
		});
	}
};
