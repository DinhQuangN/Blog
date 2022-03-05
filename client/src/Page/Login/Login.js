import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';
import { actLogin } from '../../Redux/Actions/authAction';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		err: '',
		success: ''
	});
	const { email, password, err, success } = formData;
	const dispatch = useDispatch();
	const history = useHistory();

	const handleOnclickLogin = async e => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/user/login', {
				email,
				password
			});
			setFormData({ ...formData, err: '', success: res.data.message });
			localStorage.setItem('firstLogin', true);
			dispatch(actLogin());
			history.push('/');
		} catch (error) {
			error.response.data.message &&
				setFormData({
					...formData,
					err: error.response.data.message,
					success: ''
				});
		}
	};

	return (
		<div className="login">
			<span className="loginTitle">Login</span>
			<form action="" className="loginForm">
				<label htmlFor="">Email</label>
				<input
					type="text"
					className="loginInput"
					placeholder="Enter your email ..."
					value={email}
					onChange={value =>
						setFormData({ ...formData, email: value.target.value })
					}
				/>
				<label htmlFor="">Password</label>
				<input
					type="password"
					className="loginInput"
					placeholder="Enter your password ..."
					value={password}
					onChange={value =>
						setFormData({ ...formData, password: value.target.value })
					}
				/>
				<button className="loginButton" onClick={handleOnclickLogin}>
					Login
				</button>
			</form>
			<button className="loginRegisterButton">Register</button>
		</div>
	);
};

export default Login;
