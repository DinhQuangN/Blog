import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import './Posts.scss';

const Posts = () => {
	const post = useSelector(state => state.post);
	return (
		<div className="posts">
			{post.map((item,index)=>(
				<Post item={item} key={index}/>
			))}
		</div>
	);
};

export default Posts;
