import { PROFILE } from '../Constants/ActionTypes';

const profileReducer = (state = {}, action) => {
	switch (action.type) {
		case PROFILE:
			return action.payload;
		default:
			return state;
	}
};
export default profileReducer;
