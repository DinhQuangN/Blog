import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Topbar.scss';

const Topbar = () => {
	const auth = useSelector(state => state.auth);
	const handleOnclickLogout = () => {
		localStorage.removeItem('firstLogin');
		window.location.href = '/';
	};
	return (
		<div className="top">
			<div className="topLeft">
				<i className="topIcon bx bxl-facebook-circle"></i>
				<i className="topIcon bx bxl-instagram"></i>
				<i className="topIcon bx bxl-pinterest-alt"></i>
				<i className="topIcon bx bxl-twitter"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="topLink" to="/">
							HOME
						</Link>
					</li>
					<li className="topListItem">ABOUT</li>
					<li className="topListItem">CONTACT</li>
					<li className="topListItem">
						<Link className="topLink" to="/write">
							WRITE
						</Link>
					</li>
					{auth.isLogged && (
						<li className="topListItem" onClick={handleOnclickLogout}>
							LOGOUT
						</li>
					)}
				</ul>
			</div>
			<div className="topRight">
				{auth.isLogged ? (
					<Link className="topLink" to="#">
						<img
							src={auth.user.avatar}
							alt={auth.user.name}
							className="topImg"
						/>
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="topLink" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="topLink" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<i className="topSearchIcon bx bx-search"></i>
			</div>
		</div>
	);
};

export default Topbar;
