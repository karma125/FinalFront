import { serverFetchAPI } from './apiUtils';

export const getTeachers = () => {
	return serverFetchAPI('user/getTeachers', 'GET');
};

export const getTeachersByKinder = kidnername => {
	return serverFetchAPI('user/getTeachersByKinder', 'POST', JSON.stringify(kidnername));
};
