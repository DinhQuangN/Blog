import React from 'react';

const Header: React.FC = () => {
	return (
		<div className="mt-[60px]">
			<div className="flex flex-col items-center font-lora text-[#444] relative">
				<span className="absolute top-[18%] text-xl">React & Node</span>
				<span className="absolute top-[20%] text-[100px]">BLOG</span>
			</div>
			<img
				className="w-full h-[450px] mt-[80px] object-cover"
				src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				alt=""
			/>
		</div>
	);
};

export default Header;
