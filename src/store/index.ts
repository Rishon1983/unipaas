import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth';
import generalReducer from './general';

const store = configureStore({
	reducer: {
		auth: authReducer,
		general: generalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;