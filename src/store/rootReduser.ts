import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/userSlice';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
});
