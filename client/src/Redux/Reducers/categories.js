import { FETCH_CATEGORIES } from '../Constants/ActionTypes';

const categories = [];

const CategoriesReducer = (state = categories, action) => {
	switch (action.type) {
		case FETCH_CATEGORIES:
			return action.payload;
		default:
			return state;
	}
};
export default CategoriesReducer;
