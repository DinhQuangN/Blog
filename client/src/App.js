import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SinglePost from './Components/SinglePost/SinglePost';
import Topbar from './Components/Topbar/Topbar';
import ActivateEmail from './Page/ActivateEmail/ActivateEmail';
import Homepage from './Page/Homepage/Homepage';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
import Setting from './Page/Setting/Setting';
import Write from './Page/Write/Write';
import { actFetchUser, actGetUser, actLogin } from './Redux/Actions/authAction';
import { GET_TOKEN } from './Redux/Constants/ActionTypes';
axios.defaults.withCredentials = true;

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector(state => state.token);
	const auth = useSelector(state => state.auth);
	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin');
		if (firstLogin) {
			const getToken = async () => {
				try {
					const res = await axios.post(
						'http://localhost:5000/user/refresh_token',
						null
					);
					dispatch({ type: GET_TOKEN, payload: res.data.access_token });
				} catch (error) {
					console.log(error.response);
				}
			};
			getToken();
		}
	}, [auth.isLogged, dispatch]);
	useEffect(() => {
		if (token) {
			const getUser = () => {
				dispatch(actLogin());
				return actFetchUser(token).then(res => {
					dispatch(actGetUser(res));
				});
			};
			getUser();
		}
	}, [token, dispatch]);

	return (
		<Router>
			<Topbar />
			<Switch>
				<Route path="/" exact component={Homepage} />
				<Route path="/post/:id" component={SinglePost} />
				<Route path="/search" component={Homepage} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<Route path="/write" component={auth.isLogged ? Write : Login} />
				<Route path="/setting" component={Setting} />
				<Route path="/user/activate/:activation" component={ActivateEmail} />
			</Switch>
		</Router>
	);
};

export default App;
