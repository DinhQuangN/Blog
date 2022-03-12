import { FETCH_ALL, PROFILE } from '../Constants/ActionTypes';

export const actFetch = data => {
	return {
		type: FETCH_ALL,
		payload: data
	};
};
export const actProfile = data => {
	return {
		type: PROFILE,
		payload: data
	};
};
