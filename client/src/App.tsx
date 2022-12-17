import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopHeader from './components/TopHeader/TopHeader';
import { refreshToken } from './features/Auth/authSlice';
import { getHomeBlogs } from './features/Blogs/HomeBlogSlice';
import { getCategories } from './features/Category/categorySlice';
import { useAppDispatch } from './hooks/useTypedSelector';
import Login from './pages/Auth/Login';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Write from './pages/Write/Write';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	React.useEffect(() => {
		dispatch(refreshToken());
		dispatch(getCategories());
		dispatch(getHomeBlogs());
	}, [dispatch]);
	return (
		<Router>
			<TopHeader />
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
