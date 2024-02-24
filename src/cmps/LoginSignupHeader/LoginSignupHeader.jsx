import React from 'react'
import classes from './LoginSignupHeader.module.css'

import logo from '../../Icons/logo.png'
import kids from '../../Icons/kids-1920w.webp'

export const LoginSignupHeader = () => {
	return (
		<div className={classes.container}>
			<img className={classes.logoImg} src={logo} alt='logo' />
			<img className={classes.kidsJumpingImg} src={kids} alt='kids jumping' />
		</div>
	)
}
