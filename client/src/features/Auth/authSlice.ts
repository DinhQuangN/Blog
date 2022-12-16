import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAPI, postAPI } from '../../utils/Request';
import { IAccessToken, IUser, IUserLogin } from '../../utils/TypeScript';

export const signIn = createAsyncThunk(
	'auths/signIn',
	async (data: IUserLogin, thunkApi) => {
		try {
			const response = await postAPI('login', data);
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const refreshToken = createAsyncThunk(
	'auths/refreshToken',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('refreshToken');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
export const logout = createAsyncThunk(
	'auths/logout',
	async (data: IAccessToken, thunkApi) => {
		try {
			await getAPI('logout', data.access_token);
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

interface IAuthType {
	message?: string;
	access_token: string;
	user: IUser;
}
interface IInitialStateType {
	loading: boolean;
	error: null | string;
	data: null | IAuthType;
}

const initialState = {
	loading: false,
	error: null,
	data: null
} as IInitialStateType;
const AuthSlice = createSlice({
	name: 'auths',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(signIn.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(signIn.fulfilled, (state, action: PayloadAction<IAuthType>) => {
				state.loading = false;
				state.data = action.payload;
				window.location.href = '/';
			})
			.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
			})
			.addCase(refreshToken.pending, (state, action: PayloadAction<any>) => {
				state.loading = true;
			})
			.addCase(
				refreshToken.fulfilled,
				(state, action: PayloadAction<IAuthType>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
			});
	}
});
export default AuthSlice.reducer;
