import { FETCH_ALL } from '../Constants/ActionTypes';

export const actFetch = data => {
	return {
		type: FETCH_ALL,
		payload: data
	};
};
