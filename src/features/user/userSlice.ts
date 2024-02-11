import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser, IUserAdminLogin } from '../../interfaces/IUser.ts';
import { ServerFormValidationResponse } from '../../interfaces/ServerFormValidationResponse.ts';
import { AxiosError, isAxiosError } from 'axios';
import { RootState } from '../../store';
import axiosInstance from '../../api/axiosInstance.ts';
import { IUserEdit } from '../../interfaces/IUserEdit.ts';

import {
	IPsychologist,
	IPsychologistRegisterData,
} from '../../interfaces/IPsychologist.ts';
import { IPhoto } from '../../interfaces/IPhoto.ts';

import { IPatient } from '../../interfaces/IPatient.ts';
import { message } from 'antd';

interface AuthUserData {
	email: string;
	phone: string;
	password: string;
}

export const registerUser = createAsyncThunk<
	IUser,
	AuthUserData,
	{ rejectValue: ServerFormValidationResponse }
>('auth/Register', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>(
			'/auth/register/patient',
			userData
		);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const loginUser = createAsyncThunk<
	IUser,
	AuthUserData,
	{ rejectValue: ServerFormValidationResponse }
>('auth/Login', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>('auth/login', userData);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const loginAdmin = createAsyncThunk<
	IUser,
	IUserAdminLogin,
	{ rejectValue: ServerFormValidationResponse }
>('auth/adminLogin', async (userData, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post<IUser>('auth/admin', userData);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	const response = await axiosInstance.post('/auth/logout');
	return response.data;
});

export const updateUser = createAsyncThunk<
	IUserEdit,
	IUserEdit,
	{ rejectValue: ServerFormValidationResponse }
>('auth/edit', async (data: IUserEdit, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.put(`auth/edit`, data);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const updatePatientName = createAsyncThunk(
	'patientName/edit',
	async (data: { name: string; userId: number | undefined }) => {
		const response = await axiosInstance.put(
			`patients/edit/${data.userId}`,
			data
		);

		return response.data;
	}
);

export const editUser = createAsyncThunk(
	'psychologists/edit',
	async (data: IPsychologistRegisterData) => {
		const response = await axiosInstance.put(`psychologists/edit`, data);
		return response.data;
	}
);

interface ActivateEmailArgs {
	id: string | undefined;
	role: string | null;
}

export const activateEmail = createAsyncThunk<
	IUser,
	ActivateEmailArgs,
	{ rejectValue: ServerFormValidationResponse }
>('auth/activate', async ({ id, role }, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.get<IUser>(
			`/auth/activate/${id}?role=${role}`
		);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

export const updateTokens = createAsyncThunk<
	Pick<IUser, 'accessToken'>,
	void,
	{ rejectValue: ServerFormValidationResponse }
>('auth/updateTokens', async (_, { rejectWithValue }) => {
	try {
		const response =
			await axiosInstance.get<Pick<IUser, 'accessToken'>>(
				`/auth/refresh-token/`
			);
		return response.data;
	} catch (err) {
		if (isAxiosError(err)) {
			const error: AxiosError<ServerFormValidationResponse> = err;
			if (error.response?.data) {
				return rejectWithValue(error.response.data);
			}
		}
		throw err;
	}
});

interface UserState {
	userInfo: IUser | null;
	loading: boolean;
	registerError: ServerFormValidationResponse | null;
	loginError: ServerFormValidationResponse | null;
	logged: boolean;
	dataPsychologist: IPsychologist | null;
	pagelock: boolean;
}

const initialState: UserState = {
	userInfo: null,
	registerError: null,
	loginError: null,
	loading: false,
	logged: false,
	dataPsychologist: null,
	pagelock: false,
};

const userSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		resetErrors: (state) => {
			state.registerError = null;
			state.loginError = null;
		},
		resetUser: (state, { payload }) => {
			state.userInfo = payload;
		},
		saveUser: (state, { payload }) => {
			state.userInfo = payload;
		},
		setPhotoPsychologist: (state, { payload }: { payload: IPhoto[] }) => {
			if (state.dataPsychologist) {
				state.dataPsychologist.photos = payload;
			}
		},
		setPsychologist: (state, { payload }: { payload: IPsychologist }) => {
			state.dataPsychologist = payload;
		},
		changePageLock: (state, { payload }) => {
			state.pagelock = payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
				state.registerError = null;
			})
			.addCase(registerUser.fulfilled, (state, { payload }) => {
				state.userInfo = { ...payload };
				state.loading = false;
				state.logged = true;
				state.registerError = null;
			})
			.addCase(registerUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.registerError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginUser.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.loginError = null;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(loginUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.loginError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(loginAdmin.pending, (state) => {
				state.loading = true;
				state.loginError = null;
			})
			.addCase(loginAdmin.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.loginError = null;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(loginAdmin.rejected, (state, { payload }) => {
				state.loading = false;
				state.loginError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(updateTokens.fulfilled, (state, { payload }) => {
				if (!state.userInfo) return;

				state.userInfo = {
					...state.userInfo,
					accessToken: payload.accessToken,
				};
			})
			.addCase(updateTokens.rejected, () => {
				return initialState;
			})
			.addCase(logoutUser.fulfilled, () => {
				return initialState;
			})
			.addCase(logoutUser.rejected, () => {
				return initialState;
			})
			.addCase(updateUser.fulfilled, (state, { payload }) => {
				state.loginError = null;
				state.pagelock = false;
				if (state.userInfo) {
					state.userInfo.email = payload.email as string;
					state.userInfo.phone = payload.phone as string;
				}
				message.success('Ваши изменения приняты');
			})
			.addCase(updateUser.rejected, (state, { payload }) => {
				state.loading = false;
				state.pagelock = true;
				state.loginError = {
					message: payload?.message ?? 'Error occurred',
					errors: payload?.errors ?? [],
				};
			})
			.addCase(editUser.fulfilled, (state, { payload }) => {
				state.userInfo = payload;
			})
			.addCase(
				updatePatientName.fulfilled,
				(state, action: PayloadAction<IPatient>) => {
					if (state.userInfo && state.userInfo.patient) {
						state.userInfo.patient.name = action.payload.name;
					}
				}
			)
			.addCase(activateEmail.pending, (state) => {
				state.loading = true;
			})
			.addCase(activateEmail.fulfilled, (state, { payload }) => {
				state.loading = false;
				state.logged = true;
				state.userInfo = payload;
			})
			.addCase(activateEmail.rejected, (state) => {
				state.loading = false;
			});
	},
});
export const tokenSelect = (state: RootState) => {
	return state.users.userInfo?.accessToken;
};

export const userSelect = (state: RootState) => {
	return state.users.userInfo;
};

export const { setPhotoPsychologist, setPsychologist } = userSlice.actions;
export const { resetErrors, resetUser, saveUser, changePageLock } =
	userSlice.actions;

export default userSlice;
