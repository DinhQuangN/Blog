import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPI } from '../../utils/Request';
import { IHomeBlogs } from '../../utils/TypeScript';

export const getHomeBlogs = createAsyncThunk(
	'homeBlogs/getHomeBlogs',
	async (data, thunkApi) => {
		try {
			const res = await getAPI('getHomeBlogs');
			return res.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue({ message: error.message });
		}
	}
);

interface IInitialStateType {
	loading: boolean;
	error: null | undefined;
	data: null | IHomeBlogs[];
}

const initialState = {
	loading: false,
	error: null,
	data: null
} as IInitialStateType;

const HomeBlogs = createSlice({
	name: 'homeBlogs',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			getHomeBlogs.pending,
			(state, action: PayloadAction<any>) => {
				state.loading = true;
			}
		);
		builder.addCase(
			getHomeBlogs.fulfilled,
			(state, action: PayloadAction<IHomeBlogs[]>) => {
				state.loading = false;
				state.data = action.payload;
			}
		);
		builder.addCase(
			getHomeBlogs.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
			}
		);
	}
});
export default HomeBlogs.reducer;
