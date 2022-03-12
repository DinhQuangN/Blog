import { FETCH_CATEGORIES } from '../Constants/ActionTypes';

export const actGetCategories = data => {
	return {
		type: FETCH_CATEGORIES,
		payload: data
	};
};
