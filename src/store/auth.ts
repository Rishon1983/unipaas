import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from "./index.ts";

export const getInitData = createAsyncThunk('auth/getInitData', async (_, {dispatch}) => {
	try {
		const options = {
			method: 'POST',
			url: 'http://localhost:80/getInitData',
			headers: {accept: 'application/json', 'content-type': 'application/json'},
		};

		const response = await axios.request(options);

		dispatch(authActions.setPaymentOptions(response.data.paymentOptions));
		dispatch(authActions.setConsumerId(response.data.consumerId));
		dispatch(authActions.setOrderId(response.data.orderId));
		dispatch(authActions.setAmount(response.data.amount));
		dispatch(authActions.setEmail(response.data.email));
		dispatch(authActions.setAuthorizations(response.data.authorizations));

		console.log('initData:', response.data);

	} catch (error) {
		console.error(error);
	}
});
export const fetchSessionToken = createAsyncThunk('auth/fetchSessionToken', async (consumerId: any, thunkAPI) => {
	const dispatch = thunkAPI.dispatch;
	const authState = (thunkAPI.getState() as RootState).auth;
	console.log('authState:', authState);

	try {
		const options = {
			method: 'POST',
			url: 'http://localhost:80/checkout',
			headers: {accept: 'application/json', 'content-type': 'application/json'},
			data: {
				consumerId: consumerId,
				orderId: authState.orderId,
				amount: authState.amount,
				email: authState.email,
			}
		};

		const response = await axios.request(options);
		const sessionToken = response.data.sessionToken;

		dispatch(authActions.setSessionToken(sessionToken));

	} catch (error) {
		console.error(error);
	}
});
export const verifyAuthorization = createAsyncThunk('auth/verifyAuthorization', async (data: any, {dispatch}) => {
	try {
		const options = {
			method: 'POST',
			url: 'http://localhost:80/verifyAuthorization',
			headers: {accept: 'application/json', 'content-type': 'application/json'},
			data: data,
		};

		const response = await axios.request(options);
		console.log('verify:', response.data);

	} catch (error) {
		console.error(error);
	}
});

const authInitState = {
	sessionToken: null,
	amount: null,
	paymentOptions: null,
	consumerId: null,
	email: '',
	orderId: '',
	authorizations: [],
};
const authSlice = createSlice({
	name: 'auth',
	initialState: authInitState,
	reducers: {
		setSessionToken(state, action) {
			state.sessionToken = action.payload;
		},
		setAmount(state, action) {
			state.amount = action.payload;
		},
		setPaymentOptions(state, action) {
			state.paymentOptions = action.payload;
		},
		setConsumerId(state, action) {
			state.consumerId = action.payload;
		},
		setEmail(state, action) {
			state.email = action.payload;
		},
		setOrderId(state, action) {
			state.orderId = action.payload;
		},
		setAuthorizations(state, action) {
			state.authorizations = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;