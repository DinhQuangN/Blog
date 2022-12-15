import React from 'react';

const Login: React.FC = () => {
	return (
		<div className="h-[calc(100vh-44px)] flex flex-col items-center justify-center bg-gradient-to-br from-slate-200 to-slate-200 bg-[url('https://images.pexels.com/photos/768473/pexels-photo-768473.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500')] bg-cover relative shadow-xl">
			<span className="text-[50px]">Login</span>
			<form action="" className="mt-5 flex flex-col">
				<label htmlFor="" className="my-[10px]">
					Email or Phone
				</label>
				<input
					type="text"
					className="p-[10px] bg-white border-none rounded-[10px]  w-[300px] focus:outline-none"
				/>
				<label htmlFor="" className="my-[10px]">
					Password
				</label>
				<input
					type="text"
					className="p-[10px] bg-white border-none rounded-[10px]  w-[300px] focus:outline-none"
				/>
				<button className="mt-5 cursor-pointer bg-[lightcoral] text-white p-[10px] border-none rounded-[10px] text-center shadow-md">
					Login
				</button>
			</form>
			<button className="absolute top-[60px] right-5 bg-[teal] cursor-pointer p-[10px] border-none text-white rounded-[10px] shadow-md">
				Register
			</button>
		</div>
	);
};

export default Login;
