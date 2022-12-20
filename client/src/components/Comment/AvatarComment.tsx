import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../utils/TypeScript';

interface IProps {
	user: IUser;
}

const AvatarComment: React.FC<IProps> = ({ user }) => {
	return (
		<div className="w-[70px] min-w-[70px] text-center p-1">
			<img src={user.avatar} alt="" className='w-10 h-10 rounded-[50%] object-cover'/>
			<small className="block">
				<Link to="#" className='text-[#444] no-underline font-medium hover:text-[crimson] '>{user.name}</Link>
			</small>
		</div>
	);
};

export default AvatarComment;
