import { combineReducers } from 'redux';
import authReducer from './auth';
import CategoriesReducer from './categories';
import postReducer from './posts';
import profileReducer from './profile';
import tokenReducer from './token';

const reducer = combineReducers({
	post: postReducer,
	auth: authReducer,
	token: tokenReducer,
	category: CategoriesReducer,
	profile: profileReducer
});
export default reducer;
