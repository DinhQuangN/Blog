import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useTypedSelector';
import { IBlog, IHomeBlogs } from '../../utils/TypeScript';
import Post from './Post';

const Posts: React.FC = () => {
	const { homeBlogs } = useAppSelector(state => state);
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
			{homeBlogs.data?.map((item: IHomeBlogs, _) => (
				<div className="my-[10px]" key={item._id}>
					<span className="ml-[25px] text-[25px] font-lora font-bold capitalize">
						<Link to="#">{item.name}</Link>
					</span>
					{item.blogs.map((item: IBlog, _) => (
						<Post data={item} key={item._id} />
					))}
				</div>
			))}
		</div>
	);
};

export default Posts;
