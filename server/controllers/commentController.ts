import { Response } from 'express';
import { IReqAuth } from '../config/interface';
import { io } from '../index';
import commentModel from '../models/commentModel';

export const createComment = async (req: IReqAuth, res: Response) => {
	if (!req.user) {
		return res.status(400).json({ message: 'Invalid Authentication' });
	}
	try {
		const { content, blog_id, blog_user_id } = req.body;
		const newComment = new commentModel({
			user: req.user.id,
			content,
			blog_id,
			blog_user_id
		});

		const data = {
			...newComment._doc,
			user: req.user,
			createdAt: new Date().toISOString()
		};
		io.to(`${blog_id}`).emit('createComment', data);
		res.status(200).json(newComment);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
