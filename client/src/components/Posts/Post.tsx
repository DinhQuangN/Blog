import React from 'react';
import { Link } from 'react-router-dom';

const Post: React.FC = () => {
	return (
		<div className="w-[385px] mx-[25px] mb-10 flex flex-col shadow-lg rounded-[7px] ">
			<img
				className="w-full h-[280px] object-cover rounded-[7px]"
				src="https://github.com/DinhQuangN/flutter-task/blob/main/assets/note-taking.png?raw=true"
				alt=""
			/>
			<div className="flex flex-col items-center">
				<div>
					<span className="font-varela font-normal text-[11px] text-[#be9656] leading-3 mt-[15px] mr-[10px] cursor-pointer">
						<Link to="#">#abc</Link>
					</span>
				</div>
				<span className="font-joseSans text-base font-black mt-[15px] cursor-pointer">
					<Link to="#"> abc</Link>
				</span>
				<span>
					<hr />
					<span className="font-lora italic text-[13px] font-normal text-[#999999] mt-[15px]">
						12/12/2022
					</span>
				</span>
			</div>
			<p className="font-varela font-normal text-[14px] leading-6 text-[#444] mt-[15px] overflow-hidden webkit-box">
				mo ta
			</p>
		</div>
	);
};

export default Post;
