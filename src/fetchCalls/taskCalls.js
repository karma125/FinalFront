import { serverFetchAPI } from './apiUtils'

export const addTask = task => {
	return serverFetchAPI('task/addTask', 'POST', JSON.stringify(task))
}

export const getAllTasks = () => {
	return serverFetchAPI('task/getAllTasks', 'GET')
}

export const getUserTasks = userId => {
	return serverFetchAPI('task/getUserTasks', 'POST', JSON.stringify(userId))
}

export const updateTask = task => {
	return serverFetchAPI('task/updateTask', 'POST', JSON.stringify(task))
}
