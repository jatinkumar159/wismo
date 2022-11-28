import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface SettingsState {
    otpLength: number;
}

const initialState: SettingsState = {
    otpLength: 4,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setOtpLength: (state, action: PayloadAction<number>) => {
            state.otpLength = action.payload;
        }
    }
});

export const {setOtpLength } = settingsSlice.actions;

export const selectOtpLength = (state: AppState) => state.settings.otpLength;

export default settingsSlice.reducer;