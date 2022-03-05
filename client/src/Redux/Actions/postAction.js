import { CREATE, FETCH_ALL } from '../Constants/ActionTypes';

export const actFetch = data => {
	return {
		type: FETCH_ALL,
		payload: data
	};
};
export const actCreate = data => {
	return {
		type: CREATE,
		payload: data
	};
};
