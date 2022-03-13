import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SinglePost.scss';

const SinglePost = () => {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	useEffect(() => {
		const getPost = async () => {
			const res = await axios.get('http://localhost:5000/post/' + path);
			setPost(res.data);
		};
		getPost();
	}, [path]);
	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				<img src={post.img} alt="" className="singlePostImg" />
				<h1 className="singlePostTitle">
					{post.title}
					<div className="singlePostEdit">
						<i className="singlePostIcon bx bx-edit-alt"></i>
						<i className="singlePostIcon bx bx-trash"></i>
					</div>
				</h1>
				<div className="singlePostInfo">
					<span>
						Author:
						<b className="singlePostAuthor">
							<Link className="singlePostLink" to="#">
								{post.name}
							</Link>
						</b>
					</span>
					<span>{moment(post.creatAt).fromNow()}</span>
				</div>
				<p className="singlePostDesc">
					{post.desc}
					<br />
				</p>
			</div>
		</div>
	);
};

export default SinglePost;
