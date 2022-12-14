import { Request, Response } from 'express';
import CategoryModel from '../models/categoryModel';

export const getCategories = async (req: Request, res: Response) => {
	try {
		const data = await CategoryModel.find();
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const createCategory = async (req: Request, res: Response) => {
	try {
		const name = req.body;
		const data = new CategoryModel(name);
		await data.save();
		res.status(200).json({ message: 'create success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
