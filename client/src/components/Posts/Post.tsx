import React from 'react';
import { Link } from 'react-router-dom';

interface initialState {
	image: string;
	title: string;
	tags: string[];
	category: string;
	describe: string;
}
interface IProps {
	data: initialState;
}

const Post: React.FC<IProps> = ({ data }) => {
	return (
		<div className="w-[385px] mx-[25px] mb-10 flex flex-col shadow-lg rounded-[7px] ">
			<img
				className="w-full h-[280px] object-cover rounded-[7px] border-none"
				src={data.image}
				alt=""
			/>
			<div className="flex flex-col items-center">
				<div>
					{data.tags.map((item: string, index: number) => (
						<span
							className="font-varela font-normal text-[11px] text-[#be9656] leading-3 mt-[15px] mr-[10px] cursor-pointer"
							key={index}
						>
							<Link to="#">#{item}</Link>
						</span>
					))}
				</div>
				<span className="font-joseSans text-base font-black mt-[15px] cursor-pointer capitalize">
					<Link to="#">{data.title}</Link>
				</span>
				<span>
					<hr />
					<span className="font-lora italic text-[13px] font-normal text-[#999999] mt-[15px]">
						{new Date(Date.now()).toLocaleString()}
					</span>
				</span>
			</div>
			<div
				className="font-varela font-normal text-[14px] leading-6 text-[#444] mt-[15px] overflow-hidden webkit-box p-3"
				dangerouslySetInnerHTML={{
					__html: data.describe.slice(0, 100) + '...'
				}}
			/>
		</div>
	);
};

export default Post;
