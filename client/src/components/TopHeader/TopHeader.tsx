import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../features/Auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';

const TopHeader: React.FC = () => {
	const [scrolling, setScrolling] = useState<number>(0);
	const { auth } = useAppSelector(state => state);
	const dispatch = useAppDispatch();

	useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => {
			window.removeEventListener('scroll', onScroll);
		};
	}, []);
	const onScroll = (e: Event) => {
		const window = e.currentTarget as Window;
		let currentPosition = window.scrollY;
		setScrolling(currentPosition);
	};
	const handleLogout = () => {
		dispatch(logout({ access_token: auth.data?.access_token }));
		window.location.href = '/';
	};
	return (
		<div
			className={`w-full h-[50%] bg-white sticky top-0 flex items-center z-10 font-jose py-2 ${
				scrolling > 0 ? 'shadow-lg' : ' '
			}`}
		>
			<div className="flex-[3] flex items-center justify-center">
				<i className="text-xl mr-[10px] text-[#444] cursor-pointer bx bxl-facebook-circle"></i>
				<i className="text-xl mr-[10px] text-[#444] cursor-pointer bx bxl-instagram"></i>
				<i className="text-xl mr-[10px] text-[#444] cursor-pointer bx bxl-pinterest-alt"></i>
				<i className="text-xl mr-[10px] text-[#444] cursor-pointer bx bxl-twitter"></i>
			</div>
			<div className="flex-[6]">
				<ul className="flex justify-center m-0 p-0 list-none">
					<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
						<Link to="/">HOME</Link>
					</li>
					<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
						<Link to="/">ABOUT</Link>
					</li>
					<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
						<Link to="/">CONTACT</Link>
					</li>
					<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
						<Link to="/write">WRITE</Link>
					</li>
					{auth.data?.user ? (
						<li
							className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500"
							onClick={handleLogout}
						>
							LOGOUT
						</li>
					) : null}
				</ul>
			</div>
			<div className="flex-[3] flex items-center justify-center">
				{auth.data?.user ? (
					<div className="flex justify-center items-center mr-[20px] ">
						<img
							src={auth.data?.user.avatar}
							alt={auth.data?.user.name}
							className="w-[35px] h-[35px] object-cover rounded-[50%]"
						/>
						<p className="ml-[10px] text-lg font-light cursor-pointer hover:text-gray-500 uppercase">
							{auth.data?.user.name}
						</p>
					</div>
				) : (
					<ul className="flex justify-center m-0 p-0 list-none">
						<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
							<Link className="topLink" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="mr-[20px] text-lg font-light cursor-pointer hover:text-gray-500">
							<Link className="topLink" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<i className="text-lg text-[#666] cursor-pointer bx bx-search"></i>
			</div>
		</div>
	);
};

export default TopHeader;
