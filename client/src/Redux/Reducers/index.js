import { combineReducers } from 'redux';
import postReducer from './posts';
import authReducer from './auth';
import tokenReducer from './token';

const reducer = combineReducers({
	post: postReducer,
	auth: authReducer,
	token: tokenReducer
});
export default reducer;
