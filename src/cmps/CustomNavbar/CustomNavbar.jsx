import React from 'react';
import classes from './CustomNavbar.module.css';
import { NavLink } from 'react-router-dom';

export const CustomNavbar = ({ user }) => {
	return (
		<div className={classes.navbarContainer}>
			<ul className={classes.mainNavbar}>
				{user.job !== 'יועצת פדגוגית' && (
					<li>
						<NavLink to='/home/parent-panel'> הורים </NavLink>
						<ul className={classes.nestedBar}>
							{user.job === 'הורה' ? (
								<li>
									<NavLink to='/home/add-feedback'> הוספת משוב</NavLink>
								</li>
							) : (
								<li>
									<NavLink to='/home/view-feedback'> צפייה במשובים</NavLink>
								</li>
							)}
						</ul>
					</li>
				)}
				{user.job !== 'הורה' && (
					<li>
						משימות
						<ul className={classes.nestedBar}>
							{user.job === 'יועצת פדגוגית' && (
								<li>
									<NavLink to='/home/add-task'> יצירת משימה </NavLink>
								</li>
							)}

							<li>
								<NavLink to='/home/view-task'> צפייה במשימות שלי</NavLink>
							</li>
						</ul>
					</li>
				)}
				<li>
					תכנים
					<ul className={classes.nestedBar}>
						{user.job === 'יועצת פדגוגית' && (
							<li>
								<NavLink to='/home/add-content'> העלאת תכנים </NavLink>
							</li>
						)}
						<li>
							<NavLink to='/home/search-content'> צפייה בתכנים </NavLink>
						</li>
					</ul>
				</li>
				{user.job !== 'הורה' && (
					<li>
						<NavLink to='/home/work-plan'> תוכנית עבודה</NavLink>
					</li>
				)}
			</ul>
		</div>
	);
};
