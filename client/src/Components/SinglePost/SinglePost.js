import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './SinglePost.scss';

const SinglePost = () => {
	const profile = useSelector(state => state.profile);
	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				<img src={profile.img} alt="" className="singlePostImg" />
				<h1 className="singlePostTitle">
					{profile.title}
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
								{profile.name}
							</Link>
						</b>
					</span>
					<span>{moment(profile.createdAt).fromNow()}</span>
				</div>
				<p className="singlePostDesc">
					{profile.desc}
					<br />
				</p>
			</div>
		</div>
	);
};

export default SinglePost;
