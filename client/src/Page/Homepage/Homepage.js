import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Posts from '../../Components/Posts/Posts';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Homepage.scss';

const Homepage = () => {
	const { search } = useLocation();
	return (
		<>
			<Header />
			<div className="home">
				<Posts search={search} />
				<Sidebar />
			</div>
		</>
	);
};

export default Homepage;
