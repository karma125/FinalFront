import { serverFetchAPI } from './apiUtils';

export const getFeedback = (kindergartenName) => {
	return serverFetchAPI('feedback/getFeedback', 'POST',JSON.stringify(kindergartenName));
};

export const addFeedback = feedback => {
	return serverFetchAPI('feedback/addFeedback', 'POST', JSON.stringify(feedback));
};
