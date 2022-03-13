import { combineReducers } from 'redux';
import authReducer from './auth';
import postReducer from './posts';
import tokenReducer from './token';

const reducer = combineReducers({
	post: postReducer,
	auth: authReducer,
	token: tokenReducer
});
export default reducer;
