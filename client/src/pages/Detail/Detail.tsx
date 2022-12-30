import React from 'react';
import { useLocation } from 'react-router-dom';
import { Socket } from 'socket.io-client';
import DisplayBlog from '../../components/Posts/DisplayBlog';
import { getAPI } from '../../utils/Request';
import { IBlog } from '../../utils/TypeScript';

interface IProps {
	socket: Socket;
}

const Detail: React.FC = () => {
	const [blog, setBlog] = React.useState<IBlog>();
	const { state } = useLocation();

	React.useLayoutEffect(() => {
		if (!state.id) return;
		getAPI(`getBlog/${state.id}`).then(res => setBlog(res.data[0]));
		return () => setBlog(undefined);
	}, [state.id]);
	// console.log(socket);
	// React.useEffect(() => {
	// 	if (!state.id || !socket) return;
	// 	console.log(socket, state.id);
	// 	socket.emit('joinRoom', state.id);
	// 	return () => {
	// 		socket.emit('leaveRoom', state.id);
	// 	};
	// }, [state.id, socket]);

	return <div className="flex">{blog && <DisplayBlog blog={blog} />}</div>;
};

export default Detail;
