const mongoose = require('mongoose');

const CategoriesSchema = mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		}
	},
	{ timestamps: true }
);

const Categories = mongoose.model('Categories', CategoriesSchema);
module.exports = Categories;
