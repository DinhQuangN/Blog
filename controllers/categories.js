const CategoriesMessage = require('../models/categories');

const getCategories = async (req, res) => {
	try {
		const Categories = await CategoriesMessage.find();
		res.status(200).json(Categories);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const CreateCategories = async (req, res) => {
	const categories = req.body;
	try {
		const cat = new CategoriesMessage(categories);
		await cat.save();
		res.status(200).json(cat);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = { getCategories, CreateCategories };
