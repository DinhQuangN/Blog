import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
	generateAccessToken,
	generateActiveToken,
	generateRefreshToken
} from '../config/generateToken';
import { IDecodedToken, IReqAuth, IUser } from '../config/interface';
import userModel from '../models/userModel';

const { ACTIVE, ACCESS, REFRESH } = process.env;
const CLIENT_URL = `${process.env.CLIENT_URL}`;

export const Register = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, account, password } = req.body;
		const user = await userModel.findOne({ account });
		if (user) {
			return res.status(400).json({ message: 'Account already exists!' });
		}
		const passwordHash = await bcrypt.hash(password, 12);
		const newUser = {
			name: firstName + ' ' + lastName,
			account,
			password: passwordHash
		};
		const active_token = generateActiveToken(newUser);
		res.status(200).json({ message: 'Register success' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const activeAccount = async (req: Request, res: Response) => {
	try {
		const { active_token } = req.body;
		const decode = jwt.verify(active_token, `${ACTIVE}`) as IDecodedToken;
		const { name, account, password } = decode;
		const user = await userModel.findOne({ account });
		if (user) {
			return res.status(400).json({ message: 'Account already exists!' });
		}
		const newUser = new userModel({
			name,
			account,
			password
		});
		newUser.save();
		res.status(200).json({ message: 'Account has been activated' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const login = async (req: Request, res: Response) => {
	try {
		const { account, password } = req.body;
		const user = await userModel.findOne({ account });
		if (!user) {
			return res.status(400).json({ message: "This account doesn't exists" });
		}
		loginUser(user, password, res);
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const logout = async (req: IReqAuth, res: Response) => {
	try {
		if (!req.user) {
			return res.status(400).json({ message: 'Invalid Authentication' });
		}
		res.clearCookie('rf_token', { path: 'api/refresh_token' });
		await userModel.findByIdAndUpdate({ _id: req.user.id }, { rf_token: '' });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
export const refreshToken = async (req: Request, res: Response) => {
	try {
		const rf_token = req.cookies.rf_token;
		if (!rf_token) {
			return res.status(400).json({ message: 'Please login now!' });
		}
		const decode = jwt.verify(rf_token, `${REFRESH}`) as IDecodedToken;
		if (!decode.id) {
			return res.status(400).json({ message: 'Please login now!' });
		}
		const user = await userModel
			.findById(decode.id)
			.select('-password +rf_token');
		if (!user) {
			return res.status(400).json({ message: "This account doesn't exists!" });
		}
		if (rf_token !== user.rf_token) {
			return res.status(400).json({ message: 'Please login now!' });
		}
		const access_token = generateAccessToken({ id: user.id });
		const refresh_token = generateRefreshToken({ id: user.id }, res);
		await userModel.findOneAndUpdate(
			{ _id: user.id },
			{ rf_token: refresh_token }
		);
		res.status(200).json({ access_token, user });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};
const loginUser = async (user: IUser, password: string, res: Response) => {
	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) {
		return res.status(400).json({ message: 'Password is incorrect' });
	}
	const access_token = generateAccessToken({ id: user.id });
	const rf_token = generateRefreshToken({ id: user.id }, res);
	await userModel.findOneAndUpdate({ _id: user.id }, { rf_token });
	res.status(200).json({
		message: 'Login success',
		access_token,
		user: { ...user._doc, password: '' }
	});
};
