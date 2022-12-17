import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { IBlog } from '../../utils/TypeScript';
import Comments from '../Comment/Comments';

interface IProps {
	blog: IBlog;
}

const DisplayBlog: React.FC<IProps> = ({ blog }) => {
	return (
		<div className="flex-[9]">
			<div className="p-5">
				<img
					src={blog.image}
					alt={blog.title}
					className="w-full h-full rounded-[5px] object-cover"
				/>
				<h1 className="text-center m-[10px] text-[28px] font-lora">
					<div className="float-right text-base">
						<i className="bx bx-edit-alt ml-[10px] cursor-pointer first:text-teal-600 last:text-[rgb(255,99,71)]"></i>
						<i className="bx bx-trash ml-[10px] cursor-pointer first:text-teal-600 last:text-[rgb(255,99,71)]"></i>
					</div>
				</h1>
				<div className="mb-5 flex justify-between text-base text-[#be9656] font-varela">
					<span>
						Author:
						<b className="ml-[5px]">
							<Link to="#">
								{typeof blog.user !== 'string' && blog.user?.name}
							</Link>
						</b>
					</span>
					<span>{moment(blog.createdAt as Date).fromNow()}</span>
				</div>
				<div
					className="text-[#666] text-base leading-6 first-letter:ml-5 first-letter:text-3xl font-semibold"
					dangerouslySetInnerHTML={{ __html: blog.describe }}
				/>
				<br />
				<hr />
				<Comments />
			</div>
		</div>
	);
};

export default DisplayBlog;
