import React from 'react';
import Post from './Post';

const Posts: React.FC = () => {
	return (
		<div className="flex-[9] flex flex-wrap m-5">
			<Post />
		</div>
	);
};

export default Posts;
