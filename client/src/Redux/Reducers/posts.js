const { FETCH_ALL } = require('../Constants/ActionTypes');

const postReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		default:
			return state;
	}
};
export default postReducer;
