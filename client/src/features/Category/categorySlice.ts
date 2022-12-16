import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPI } from '../../utils/Request';
import { ICategory } from '../../utils/TypeScript';

export const getCategories = createAsyncThunk(
	'categories/getCategories',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('getCategories');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface IInitialStateType {
	loading: boolean;
	error: null | undefined;
	data: null | ICategory[];
}

const initialState = {
	loading: false,
	error: null,
	data: null
} as IInitialStateType;

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			getCategories.pending,
			(state, action: PayloadAction<any>) => {
				state.loading = true;
			}
		);
		builder.addCase(
			getCategories.fulfilled,
			(state, action: PayloadAction<ICategory[]>) => {
				state.loading = false;
				state.data = action.payload;
			}
		);
		builder.addCase(
			getCategories.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
			}
		);
	}
});
export default categorySlice.reducer;
