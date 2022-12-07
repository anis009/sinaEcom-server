import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateAuthToken.js";
import { sendEmail } from "../middleware/sendEmail.js";
import crypto from "crypto";
// @desc Registered User
// @route POST /api/users
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const existUser = await User.findOne({ email });
	if (existUser) {
		res.status(404);
		throw new Error("User already exists😂😂");
	}
	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("User not found");
	}
});

// @desc Auth User & Get token
// @route POST /api/users/login
// @access Public

export const authUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not Found😂😪😥");
		}
		const match = await user.matchPassword(password);
		if (user && match) {
			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			throw new Error("Invalid email or password😂🤣");
		}
	} catch (err) {
		res.status(403).json({
			message: err.message,
		});
	}
};

// @desc Update User
// @route PUT /api/users
// @access private

export const updateUser = async (req, res) => {
	try {
		const { email, name } = req.body;
		const user = await User.findOne({ email: req.user.email });

		if (!user) {
			throw new Error("User not Found😂😪😥");
		}

		user.name = name || user.name;
		if (email && email !== user.email) {
			const isExist = await User.findOne({ email });
			if (isExist) {
				throw new Error("Email is already exist😪😪");
			}
		}
		user.email = email || user.email;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
		});

		//const match = await user.matchPassword(password);
	} catch (err) {
		res.status(403).json({
			message: err.message,
		});
	}
};

// @desc Forgot Password
// @route POST /api/users/forgotpassword
// @access private

export const forgotPassword = async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("Email Could not be sent");
		}

		const resetToken = await user.getResetPasswordToken();

		await user.save();

		const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`;

		const message = `
		<h1> You have requested a password reset</h1>
		<p>Please to to this link to reset your password </p>
		<a href=${resetUrl} clicktracking=off>
		${resetUrl}
		</a>
		`;

		try {
			await sendEmail({
				to: user.email,
				subject: "Password Reset Token",
				text: message,
			});

			res.status(200).json({
				data: "Please check the email",
			});
		} catch (err) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;
			await user.save();
			res.status(500).json({
				message: "email could not be sent",
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

// @desc Forgot Password
// @route POST /api/users/resetpassword/:resetToken
// @access private

export const resetPassword = async (req, res) => {
	const resetToken = req.params.resetToken;
	const { password } = req.body;
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	try {
		const user = await User.findOne({
			resetPasswordToken,
			resetPasswordExpire: {
				$gt: Date.now(),
			},
		});

		if (!user) {
			throw new Error("Invalid Reset Token");
		}

		user.password = password;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;
		await user.save();

		res.json({
			data: "password reset success",
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};
