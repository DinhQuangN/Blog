import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SinglePost from '../../Components/SinglePost/SinglePost';
import './Single.scss';

const Single = () => {
	return (
		<div className="single">
			<SinglePost />
			<Sidebar />
		</div>
	);
};

export default Single;
