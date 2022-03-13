import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Posts from '../../Components/Posts/Posts';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { actFetch } from '../../Redux/Actions/postAction';
import './Homepage.scss';

const Homepage = () => {
	const dispatch = useDispatch();
	const { search } = useLocation();
	useEffect(() => {
		const getFetch = async () => {
			try {
				const res = await axios.get('http://localhost:5000/post');
				dispatch(actFetch(res.data));
			} catch (error) {
				console.log(error.response);
			}
		};
		getFetch();
	}, [dispatch]);
	useEffect(() => {
		const getSearch = async () => {
			const res = await axios.get('http://localhost:5000/post/search' + search);
			dispatch(actFetch(res.data));
		};
		getSearch();
	}, [search, dispatch]);
	return (
		<>
			<Header />
			<div className="home">
				<Posts />
				<Sidebar />
			</div>
		</>
	);
};

export default Homepage;
