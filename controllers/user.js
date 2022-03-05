const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserMessage = require('../models/user');
const sendEmail = require('./sendMail');

const Register = async (req, res) => {
	try {
		const { email, password, firstName, lastName, confirmPassword } = req.body;
		if (!validateEmail(email)) {
			return res.status(400).json({ msg: 'Invalid emails.' });
		}
		const user = await UserMessage.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: 'This email already exists.' });
		}
		if (password !== confirmPassword) {
			res.status(400).json({ message: "Password don't match." });
		}
		if (password.length < 6) {
			return res
				.status(400)
				.json({ msg: 'Password must be at least 6 characters.' });
		}
		const hashPassword = await bcrypt.hash(password, 12);
		const newUser = {
			name: `${firstName} ${lastName}`,
			email,
			password: hashPassword
		};
		const activation = jwt.sign(newUser, process.env.ACTIVATION, {
			expiresIn: '1h'
		});
		const url = `${process.env.CLIENT_URL}/user/activate/${activation}`;
		sendEmail(email, url, 'Verify your email address');
		res.json({ msg: 'Register Success! Please activate your email to start.' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const activateEmail = async (req, res) => {
	try {
		const { activation } = req.body;
		const user = jwt.verify(activation, process.env.ACTIVATION);
		const { name, email, password } = user;
		const check = await UserMessage.findOne({ email });
		if (check) {
			return res.status(400).json({ message: 'This email already exists' });
		}
		const newUser = new UserMessage({
			name,
			email,
			password
		});
		await newUser.save();
		res.status(200).json({ message: 'Account has been activated!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await UserMessage.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'This email does not exist.' });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Password is incorrect.' });
		}
		const refresh = jwt.sign({ id: user._id }, process.env.REFRESH, {
			expiresIn: '30m'
		});
		res.cookie('refreshToken', refresh, {
			httpOnly: true,
			path: '/user/refresh_token',
			maxAge: 7 * 24 * 60 * 60 * 1000
		});
		res.status(200).json({ message: 'Login success', refresh });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const RefreshAccessToken = (req, res) => {
	try {
		const rf_token = req.cookies.refreshToken;
		if (!rf_token) {
			return res.status(400).json({ message: 'Please login now!' });
		}
		jwt.verify(rf_token, process.env.REFRESH, (err, user) => {
			if (err) {
				return res.status(400).json({ msg: err.message });
			}
			const access_token = jwt.sign({ id: user.id }, process.env.ACCESS, {
				expiresIn: '30m'
			});
			res.status(200).json({ access_token });
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		const user = await UserMessage.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'This email does not exist.' });
		}
		const access = jwt.sign({ id: user._id }, process.env.ACCESS, {
			expiresIn: '1h'
		});
		const url = `${process.env.CLIENT_URL}/user.reset/${access}`;
		sendEmail(email, url, 'Reset your password');
		res
			.status(200)
			.json({ message: 'Re-send the password, please check your email.' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const resetPassword = async (req, res) => {
	try {
		const { password } = req.body;
		const hashPassword = await bcrypt.hash(password, 12);
		await UserMessage.findByIdAndUpdate(
			{ _id: req.user.id },
			{ password: hashPassword }
		);
		res.status(200).json({ message: 'Password successfully changed!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getUserInfo = async (req, res) => {
	try {
		const user = await UserMessage.findById(req.user.id);
		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const getUserAllInfo = async (req, res) => {
	try {
		const users = await UserMessage.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const logout = async (req, res) => {
	try {
		res.clearCookie('refreshToken', { path: '/user/refresh_token' });
		return res.status(200).json({ message: 'Logout out' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
const validateEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};
module.exports = {
	Register,
	activateEmail,
	login,
	RefreshAccessToken,
	resetPassword,
	forgotPassword,
	getUserInfo,
	getUserAllInfo,
	logout
};
