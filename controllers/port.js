const PortMessage = require('../models/port');

const getPort = async (req, res) => {
	try {
		const getPort = await PortMessage.find();
		res.status(200).json(getPort);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const createPort = async (req, res) => {
	const post = req.body;
	try {
		const newPort = new PortMessage({
			...post,
			creator: req.user.id
		});
		await newPort.save();
		res.status(200).json(newPort);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const updatePort = async (req, res) => {
	const { id } = req.params;
	const { title, desc, img, categories, tags } = req.body;
	try {
		const updatedPost = { title, desc, img, categories, tags, _id: id };
		await PortMessage.findByIdAndUpdate(id, updatedPost, { new: true });
		res.status(200).json(updatedPost);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const deletePort = async (req, res) => {
	const { id } = req.params;
	try {
		await PortMessage.findByIdAndDelete(id);
		res.status(200).json('Post has been deleted...');
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getProfile = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await PortMessage.findById(id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getCategories = async (req, res) => {
	const { cat } = req.query;
	try {
		const categories = new RegExp(cat, 'i');
		const category = await PortMessage.find({
			categories
		});
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getPort,
	createPort,
	updatePort,
	deletePort,
	getCategories,
	getProfile
};
