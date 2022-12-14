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
