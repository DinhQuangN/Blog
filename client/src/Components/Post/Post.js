import React from 'react';
import './Post.scss';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Post = ({ item }) => {
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
				<span className="postTitle">
					<Link to="#" className="postLink">
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
