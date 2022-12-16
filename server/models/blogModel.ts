import mongoose from 'mongoose';
import { IBlog } from '../config/interface';

const blogSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Types.ObjectId,
			require
		},
		title: {
			type: String,
			require: true
		},
		tags: {
			type: [],
			require: true
		},
		category: {
			type: mongoose.Types.ObjectId,
			require: true
		},
		describe: {
			type: String,
			require: true
		}
	},
	{
		timestamps: true
	}
);
const blog = mongoose.model<IBlog>('blog', blogSchema);
export default blog;
