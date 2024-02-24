import { serverFetchAPI } from './apiUtils';

export const signUp = credentials => {
	return serverFetchAPI('auth/signup', 'POST', JSON.stringify(credentials));
};

export const logIn = credentials => {
	return serverFetchAPI('auth/login', 'POST', JSON.stringify(credentials));
};

export const getUser = email => {
	return serverFetchAPI('auth/getUser', 'POST', JSON.stringify(email));
};
