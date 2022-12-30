import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import TopHeader from './components/TopHeader/TopHeader';
import { refreshToken } from './features/Auth/authSlice';
import { getHomeBlogs } from './features/Blogs/HomeBlogSlice';
import { getCategories } from './features/Category/categorySlice';
import { useAppDispatch } from './hooks/useTypedSelector';
import Login from './pages/Auth/Login';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Write from './pages/Write/Write';
import SocketClient from './utils/socketClient';

const App: React.FC = () => {
	const socketClient = React.useRef<Socket>();
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(refreshToken());
		dispatch(getCategories());
		dispatch(getHomeBlogs());
	}, [dispatch]);

	React.useEffect(() => {
		if (!socketClient.current || socketClient.current.disconnected) {
			socketClient.current = io('http://localhost:5000');
		}
		return () => {
			if (socketClient.current?.connected) socketClient.current.disconnect();
		};
	}, []);
	console.log(socketClient.current);
	
	return (
		<Router>
			<TopHeader />
			<SocketClient />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/write" element={<Write />} />
				<Route path="/login" element={<Login />} />
				<Route path="/blog/:nameBlog" element={<Detail />} />
			</Routes>
		</Router>
	);
};

export default App;
