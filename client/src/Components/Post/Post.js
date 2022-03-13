import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import './Post.scss';

const Post = ({ item }) => {
	const handleProfile = () => {};
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
					<Link to={`post/${item._id}`} className="postLink">
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
