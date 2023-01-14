import { ChangeEvent, FormEvent } from 'react';
export type InputChange = ChangeEvent<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;
export type FormSubmit = FormEvent<HTMLFormElement>;
export interface IParams {
	id: string;
}
export interface IUserLogin {
	account: string;
	password: string;
}
export interface IUser {
	_id?: string;
	account: string;
	name: string;
	avatar: string;
	role?: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface IAccessToken {
	id?: string;
	access_token?: string;
}
export interface ICategory {
	_id?: string;
	name: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface IBlog {
	_id?: string;
	image: string;
	title: string;
	tags: string[];
	category: string | ICategory;
	user?: string | IUser;
	describe: string;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface IHomeBlogs {
	_id?: string;
	name: string;
	count: number;
	blogs: IBlog[];
}
export interface IComment {
	_id?: string;
	user: IUser;
	blog_id: string;
	blog_user_id: string;
	content: string;
	replyCM: IComment[];
	reply_user?: IUser;
	comment_root?: string;
	createdAt: string;
}
