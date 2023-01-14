import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postAPI } from '../../utils/Request';
import { IUser } from '../../utils/TypeScript';

interface IClientComment {
	content: string;
	user: IUser;
	blog_id: string | undefined;
	blog_user_id: string | undefined;
	replyCM: string[];
	createdAt: string;
	_id?: string;
}
interface payload {
	data: IClientComment;
	token: string;
}
export const createComment = createAsyncThunk(
	'comments/createComment',
	async (data: payload, thunkApi) => {
		try {
			const res = await postAPI('createComment', data.data, data.token);
			return res.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
interface IGetComment {
	comment: string[];
	total: number;
}
interface IInitialStateType {
	loading: boolean;
	error: null;
	data: null | IGetComment[];
}

const initialState = {
	loading: false,
	error: null,
	data: null
} as IInitialStateType;

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(
			createComment.pending,
			(state, action: PayloadAction<any>) => {
				state.loading = true;
			}
		);
		builder.addCase(
			createComment.fulfilled,
			(state, action: PayloadAction<any>) => {
				console.log(action.payload);
			}
		);
		builder.addCase(
			createComment.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			}
		);
	}
});

export default commentSlice.reducer;
