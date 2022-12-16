import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import blogModel from '../models/blogModel';

export const createBlog = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, tags, category, describe, image } = req.body;
		const newData = new blogModel({
			user: req.user.id,
			title,
			tags,
			category,
			describe,
			image
		});
		await newData.save();
		res.status(200).json({ message: 'Create success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getBlog = async (req: Request, res: Response) => {
	try {
		const data = await blogModel.find();
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
