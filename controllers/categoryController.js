// @desc create category
// @route POST /api/category
// @access Private

import Category from "../models/category.js";

export const createCategory = async (req, res) => {
	const data = req.body;
	try {
		const saveCategory = new Category(data);
		await saveCategory.save();
		res.json(saveCategory);
	} catch (err) {
		res.status(400).json({
			message: err.message,
		});
	}
};

export const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({});
		res.json(categories);
	} catch (error) {
		res.status(400).json({
			message: error.message,
		});
	}
};
