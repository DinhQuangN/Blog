import React from 'react';
import Header from '../../components/Header/Header';
import Posts from '../../components/Posts/Posts';

const Home: React.FC = () => {
	return (
		<>
			<Header />
			<div className="flex">
				<Posts />
			</div>
		</>
	);
};

export default Home;
