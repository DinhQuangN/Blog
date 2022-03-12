import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actFetch } from '../../Redux/Actions/postAction';
import Post from '../Post/Post';
import './Posts.scss';

const Posts = ({ search }) => {
	const post = useSelector(state => state.post);
	const dispatch = useDispatch();

	useEffect(() => {
		const getSearch = async () => {
			try {
				const res = await axios.get(
					'http://localhost:5000/post/search' + search
				);
				dispatch(actFetch(res.data));
			} catch (error) {
				console.log(error.response);
			}
		};
		getSearch();
	}, [search, dispatch]);

	return (
		<div className="posts">
			{post?.map((item, index) => (
				<Post item={item} key={index} />
			))}
		</div>
	);
};

export default Posts;
