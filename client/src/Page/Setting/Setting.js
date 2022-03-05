import React from 'react';
import './Setting.scss';
import Sidebar from '../../Components/Sidebar/Sidebar';

const Setting = () => {
	return (
		<div className="setting">
			<div className="settingWrapper">
				<div className="settingTitle">
					<span className="settingTitleUpdate">Update Your Account</span>
					<span className="settingTitleDelete">Delete Account</span>
				</div>
				<form action="" className="settingForm">
					<label htmlFor="">Profile Picture</label>
					<div className="settingPP">
						<img
							src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
							alt=""
						/>
						<label htmlFor="fileInput">
							<i class="settingPPIcon bx bxs-user-circle"></i>
						</label>
						<input
							type="file"
							className="settingPPInput"
							id="fileInput"
							style={{ display: 'none' }}
						/>
					</div>
					<label htmlFor="">Username</label>
					<input type="text" placeholder="Safak" name="name" />
					<label htmlFor="">Email</label>
					<input type="email" placeholder="safak@gmail.com" name="email" />
					<label htmlFor="">Password</label>
					<input type="password" placeholder="Password " name="password" />
					<button className="settingSubmitButton" type="submit">
						Update
					</button>
				</form>
			</div>
			<Sidebar />
		</div>
	);
};

export default Setting;
