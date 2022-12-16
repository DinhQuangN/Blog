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
	createdAt?: string;
	updatedAt?: string;
}
export interface IAccessToken {
	id?: string;
	access_token?: string;
}
export interface ICategory {
	_id?: string;
	name: string;
	createdAt?: string;
	updatedAt?: string;
}
