import React, { useContext } from 'react';
import classes from './Header.module.css';
import logo from '../../Icons/logo.png';
import house from '../../Icons/house.png';
import { CustomNavbar } from '../CustomNavbar/CustomNavbar';
import { userContext } from '../../general/userContext';
import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

export const Header = () => {
	const { user, setUser } = useContext(userContext);
	const navigate = useNavigate();

	const onlogOut = () => {
		setUser(null);

		googleLogout();
		navigate('/');
	};

	const onHome = () => {
		navigate('/home');
	};

	return (
		<div className={classes.headerContainer}>
			<div>
				<div className={classes.actionBtns}>
					<img className={classes.houseImg} src={house} alt='house' onClick={onHome} />
					<button className={classes.logOutBtn} onClick={onlogOut}>
						התנתקות
					</button>
					<p className={classes.fullname}>{user.firstName + ' ' + user.lastName}</p>
				</div>

				<img className={classes.logoImg} src={logo} alt='logo' onClick={onHome} />
			</div>
			<div>
				<CustomNavbar user={user} />
			</div>
		</div>
	);
};
