import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const generalInitState = {
	mode:'mainCard'
};
const generalSlice = createSlice({
	name: 'general',
	initialState: generalInitState,
	reducers: {
		setMode: (state, action: PayloadAction<string>) => {
			state.mode = action.payload;
		},
	},
});

export const generalActions = generalSlice.actions;
export default generalSlice.reducer;