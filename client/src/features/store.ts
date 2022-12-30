import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Auth/authSlice';
import homeBlogs from './Blogs/HomeBlogSlice';
import categorySlice from './Category/categorySlice';

const store = configureStore({
	reducer: {
		auth: authSlice,
		category: categorySlice,
		homeBlogs
	},
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
