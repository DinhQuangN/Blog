import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Auth/authSlice';
import categorySlice from './Category/categorySlice';

const store = configureStore({
	reducer: { auth: authSlice, category: categorySlice },
	devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
