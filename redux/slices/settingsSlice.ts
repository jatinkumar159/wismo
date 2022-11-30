import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface SettingsState {
    otpLength: number;
    cartPayload: any;
}

const initialState: SettingsState = {
    otpLength: 4,
    cartPayload: undefined,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setOtpLength: (state, action: PayloadAction<number>) => {
            state.otpLength = action.payload;
        },
        setCardPayload: (state, action: PayloadAction<any>) => {
            state.cartPayload = action.payload;
        }
    }
});

export const {setOtpLength, setCardPayload } = settingsSlice.actions;

export const selectOtpLength = (state: AppState) => state.settings.otpLength;
export const selectCartPayload = (state: AppState) => state.settings.cartPayload;

export default settingsSlice.reducer;