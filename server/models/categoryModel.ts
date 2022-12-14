import mongoose from 'mongoose';
import { ICategory } from '../config/interface';

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		}
	},
	{
		timestamps: true
	}
);
const category = mongoose.model<ICategory>('category', categorySchema);
export default category;
