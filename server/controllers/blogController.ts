import { Request, Response } from 'express';
import { IReqAuth } from '../config/interface';
import blogModel from '../models/blogModel';

const Pagination = (req: IReqAuth) => {
	let page = Number(req.query.page) * 1 || 1;
	let limit = Number(req.query.limit) * 1 || 4;
	let skip = (page - 1) * limit;

	return { page, limit, skip };
};

export const createBlog = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(404).json({ message: 'Invalid Authentication' });
	}
	try {
		const { title, tags, category, describe, image } = req.body;
		console.log(image);
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
export const getHomeBlogs = async (req: Request, res: Response) => {
	try {
		const data = await blogModel.aggregate([
			//user
			{
				$lookup: {
					from: 'users',
					let: {
						user: '$user'
					},
					pipeline: [
						{
							$match: { $expr: { $eq: ['$_id', '$$user'] } }
						},
						{
							$project: { password: 0 }
						}
					],
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			},
			//category
			{
				$lookup: {
					from: 'categories',
					localField: 'category',
					foreignField: '_id',
					as: 'category'
				}
			},
			{
				$unwind: '$category'
			},
			{
				$sort: { createdAt: -1 }
			},
			{
				$group: {
					_id: '$category._id',
					name: { $first: '$category.name' },
					blogs: { $push: '$$ROOT' },
					count: { $sum: 1 }
				}
			},
			{
				$project: {
					blogs: {
						$slice: ['$blogs', 0, 4]
					},
					count: 1,
					name: 1
				}
			}
		]);
		res.status(200).json(data);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const getBlog = async (req: Request, res: Response) => {
	try {
		const blog = await blogModel
			.find({ _id: req.params.id })
			.populate('user', '-password')
			.populate('category');
		if (!blog) return res.status(400).json({ message: "Blog doesn't exists" });
		res.status(200).json(blog);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
