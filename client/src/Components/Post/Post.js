import axios from 'axios';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actProfile } from '../../Redux/Actions/postAction';
import './Post.scss';

const Post = ({ item }) => {
	const dispatch = useDispatch();
	const handleProfile = async () => {
		try {
			const res = await axios.get('http://localhost:5000/post/' + item._id);
			dispatch(actProfile(res.data));
			console.log(res);
		} catch (error) {
			console.log(error.response);
		}
	};
	return (
		<div className="post">
			<img src={item.img} alt="" className="postImg" />
			<div className="postInfo">
				<div className="postCat">
					{item.tags.map((tag, index) => (
						<span className="postCats" key={index}>
							<Link className="postLink" to="#">
								#{tag}
							</Link>
						</span>
					))}
				</div>
				<span className="postTitle" onClick={handleProfile}>
					<Link to={`profile/${item._id}`} className="postLink">
						{item.title}
					</Link>
				</span>
				<hr />
				<span className="postDate">{moment(item.createdAt).fromNow()}</span>
			</div>
			<p className="postDesc">{item.desc}</p>
		</div>
	);
};

export default Post;
