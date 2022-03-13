import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Post/Post';
import './Posts.scss';

const Posts = () => {
	const post = useSelector(state => state.post);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	const getSearch = async () => {
	// 		const res = await axios.get('http://localhost:5000/post/search' + search);
	// 		dispatch(actFetch(res.data));
	// 	};
	// 	getSearch();
	// }, [search, dispatch]);

	return (
		<div className="posts">
			{post?.map((item, index) => (
				<Post item={item} key={index} />
			))}
		</div>
	);
};

export default Posts;
