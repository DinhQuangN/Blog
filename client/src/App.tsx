import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopHeader from './components/TopHeader/TopHeader';
import Login from './pages/Auth/Login';
import Home from './pages/Home/Home';

const App: React.FC = () => {
	return (
		<Router>
			<TopHeader />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
};

export default App;
