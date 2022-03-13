import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

const Sidebar = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		const getCat = async () => {
			const res = await axios.get('http://localhost:5000/categories');
			setCategories(res.data);
		};
		getCat();
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">ABOUT ME</span>
				<img
					src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
					alt=""
				/>
				<p>
					Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
					amet ex esse.Sunt eu ut nostrud id quis proident.
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">CATEGORIES</span>
				<ul className="sidebarList">
					{categories?.map((item, index) => (
						<li className="sidebarListItem" key={index}>
							<Link className="sidebarLink" to={`/search?cat=${item.name}`}>
								{item.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">FOLLOW US</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon bx bxl-facebook-circle"></i>
					<i className="sidebarIcon bx bxl-instagram"></i>
					<i className="sidebarIcon bx bxl-pinterest-alt"></i>
					<i className="sidebarIcon bx bxl-twitter"></i>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
