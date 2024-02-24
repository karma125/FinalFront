import React, { useContext } from 'react';
import classes from './Login.module.css';
import { LoginSignupHeader } from '../../cmps/LoginSignupHeader/LoginSignupHeader';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../fetchCalls/authCalls';
import { userContext } from '../../general/userContext';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export const Login = () => {
	const { setUser } = useContext(userContext);
	const navigate = useNavigate();

	const logUser = user => {
		setUser(user);
		navigate('/home');
	};

	const SCOPES =
		'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar';

	const googleLogin = useGoogleLogin({
		scope: SCOPES,
		onSuccess: async response => {
			try {
				const userData = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
					headers: {
						Authorization: `Bearer ${response.access_token}`,
					},
				});

				const user = await getUser({ email: userData.data.email });
				console.log(response);

				if (user) {
					user.access_token = response.access_token;
					logUser(user);
				} else navigate('/signup', { state: { user: userData.data } });
			} catch (err) {
				console.error('Error fetching user data:', err);
			}
		},
	});

	return (
		<div className={classes.loginContainer}>
			<LoginSignupHeader />

			<h2 className={classes.welcomeHeader}> ברוכים הבאים </h2>

			<div className={classes.loginForm}>
				<button onClick={googleLogin}>
					<h3>כניסה למערכת</h3>
					<img
						src='https://res.cloudinary.com/dimirmc9j/image/upload/v1674739590/icons8-google-48_serqxw.png'
						alt='גוגל'
					/>
				</button>
			</div>
		</div>
	);
};
