import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface SettingsState {
    otpLength: number;
    cartPayload: any;
    cart: any;
}

const initialState: SettingsState = {
    otpLength: 4,
    cartPayload: undefined,
    cart: undefined,
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setOtpLength: (state, action: PayloadAction<number>) => {
            state.otpLength = action.payload;
        },
        setCartPayload: (state, action: PayloadAction<any>) => {
            state.cartPayload = action.payload;
        },
        setCart: (state, action: PayloadAction<any>) => {
            state.cart = action.payload;
        }
    }
});

export const {setOtpLength, setCartPayload, setCart} = settingsSlice.actions;

export const selectOtpLength = (state: AppState) => state.settings.otpLength;
export const selectCartPayload = (state: AppState) => state.settings.cartPayload;
export const selectCart = (state: AppState) => state.settings.cart;

export default settingsSlice.reducer;