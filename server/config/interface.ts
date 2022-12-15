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
