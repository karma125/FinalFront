// parents
//View content

//KinderGartener
// view content
// View Tasks

//יועצת
// everything except parent panel

import { useContext } from 'react';
import { userContext } from './general/userContext';

export const RequireAuth = (nextState, replace) => {
	const { user } = useContext(userContext);

	// if (!user) {
	// 	replace({
	// 		pathname: '/',
	// 		state: { nextPathname: nextState.location.pathname },
	// 	});
	// }
};

export const Only = (nextState, replace) => {
	const { user } = useContext(userContext);

	// if (!user) {
	// 	replace({
	// 		pathname: '/',
	// 		state: { nextPathname: nextState.location.pathname },
	// 	});
	// }
};
