import axios from 'axios';
import { Store } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { updateTokens } from '../features/user/userSlice';

type AppStore = Store<RootState>;

let appStore: AppStore;
export const appStoreInject = (store: AppStore) => {
	appStore = store;
};

const axiosInstance = axios.create({
	withCredentials: true,
	baseURL: import.meta.env.VITE_API_URL,
});
axiosInstance.interceptors.request.use((config) => {
	try {
		config.headers.Authorization =
			appStore.getState().users.userInfo?.accessToken;
	} catch (e) {
		console.log(e);
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const accessToken = appStore.getState().users.userInfo?.accessToken;

		if (accessToken && error.response.status === 401) {
			try {
				const originalRequest = error.config;

				await (appStore.dispatch as AppDispatch)(updateTokens()).unwrap();
				return axiosInstance(originalRequest);
			} catch (e) {
				console.log(e);
			}
		}

		throw error;
	}
);

export default axiosInstance;
