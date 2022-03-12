import axios from 'axios';
import React, { useState } from 'react';
import './Register.scss';

const Register = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		confirmPassword: '',
		err: '',
		success: ''
	});
	const { email, password, firstName, lastName, confirmPassword } = formData;
	const handleOnclickRegister = async e => {
		e.preventDefault();
		try {
			const res = await axios.post('http://localhost:5000/user/register', {
				email,
				password,
				firstName,
				lastName,
				confirmPassword
			});
			setFormData({ ...formData, err: '', success: res.data.msg });
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
		<div className="register">
			<span className="registerTitle">Register</span>
			<form className="registerForm">
				<label>FirstName</label>
				<input
					className="registerInput"
					type="text"
					placeholder="Enter your firstname..."
					value={firstName}
					onChange={value =>
						setFormData({ ...formData, firstName: value.target.value })
					}
				/>
				<label>LastName</label>
				<input
					className="registerInput"
					type="text"
					placeholder="Enter your lastname..."
					value={lastName}
					onChange={value =>
						setFormData({ ...formData, lastName: value.target.value })
					}
				/>
				<label>Email</label>
				<input
					className="registerInput"
					type="text"
					placeholder="Enter your email..."
					value={email}
					onChange={value =>
						setFormData({ ...formData, email: value.target.value })
					}
				/>
				<label>Password</label>
				<input
					className="registerInput"
					type="password"
					placeholder="Enter your password..."
					value={password}
					onChange={value =>
						setFormData({ ...formData, password: value.target.value })
					}
				/>
				<label>ConfirmPassword</label>
				<input
					className="registerInput"
					type="password"
					placeholder="Enter your confirmPassword..."
					value={confirmPassword}
					onChange={value =>
						setFormData({ ...formData, confirmPassword: value.target.value })
					}
				/>
				<button className="registerButton" onClick={handleOnclickRegister}>
					Register
				</button>
			</form>
			<button className="registerLoginButton">Login</button>
		</div>
	);
};

export default Register;
