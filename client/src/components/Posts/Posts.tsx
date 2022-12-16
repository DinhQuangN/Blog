import React from 'react';
import Post from './Post';

const Posts: React.FC = () => {
	const data = {
		image:
			'https://github.com/DinhQuangN/flutter-task/blob/main/assets/note-taking.png?raw=true',
		title: '12/12/2022',
		tags: ['abc', 'svhd', 'gvfdj'],
		category: '12/12/2022',
		describe: 'abc'
	};
	return (
		<div className="flex-[9] flex flex-wrap m-5">
			<Post data={data} />
		</div>
	);
};

export default Posts;
