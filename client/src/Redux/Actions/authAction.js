import axios from 'axios';
import { GET_USER, LOGIN } from '../Constants/ActionTypes';

export const actLogin = () => {
	return {
		type: LOGIN
	};
};
export const actFetchUser = async token => {
	const res = await axios.get('http://localhost:5000/user/info', {
		headers: { Authorization: token }
	});
	return res;
};
export const actGetUser = res => {
	return {
		type: GET_USER,
		payload: {
			user: res.data,
			isAdmin: res.data.role === 1 ? true : false
		}
	};
};
