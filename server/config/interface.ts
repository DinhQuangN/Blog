import { Request } from 'express';
export interface ICategory {
	name: string;
}
export interface IUser {
	id?: string;
	name: string;
	account: string;
	password: string;
	avatar: string;
	role: string;
	rf_token?: string;
	_doc: object;
}
interface INewUser {
	name: string;
	account: string;
	password: string;
}
export interface IDecodedToken extends INewUser {
	id?: string;
	iat?: string;
	exp?: string;
}
export interface IReqAuth extends Request {
	user?: IUser;
}
export interface IBlog {
	user: IUser;
	title: string;
	image: string;
	tags: string[];
	describe: string;
	category: ICategory;
}
export interface IComment {
	user: string;
	blog_id: string;
	blog_user_id: string;
	content: string;
	replyCM: string[];
	reply_user: string;
	comment_root: string;
	_doc: object;
}
