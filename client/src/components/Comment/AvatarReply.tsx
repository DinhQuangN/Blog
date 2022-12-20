import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../utils/TypeScript';

interface IProps {
	user: IUser;
	reply_user?: IUser;
}

const AvatarReply: React.FC<IProps> = ({ user, reply_user }) => {
	return (
		<div className="flex items-center mb-1">
			<img
				src={user.avatar}
				alt=""
				className="w-10 h-10 rounded-[50%] object-cover"
			/>
			<div>
				<small>
					<Link to="#">{user.name}</Link>
				</small>
				<small className="block opacity-50 text-[11px]">
					Reply to <Link to="#">{reply_user?.name}</Link>
				</small>
			</div>
		</div>
	);
};

export default AvatarReply;
