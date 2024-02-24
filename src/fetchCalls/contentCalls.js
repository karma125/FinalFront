import { serverFetchAPI } from './apiUtils';

export const getContent = () => {
	return serverFetchAPI('content/getContent', 'GET');
};

export const addContent = content => {
	return serverFetchAPI('content/addContent', 'POST', JSON.stringify(content));
};

export const removeContent = contentId => {
	return serverFetchAPI('content/removeContent', 'DELETE', JSON.stringify(contentId));
};
