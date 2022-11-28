import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../../components/SearchCountry/SearchCountry";
import { AppState } from "../store";

export interface ProfileState {
    phone: string;
    country: Country;
    isLoading: boolean;
    isVerified: boolean;
}

const initialState: ProfileState = {
    phone: '',
    country: { "name": "India", "flag": "🇮🇳", "code": "IN", "dial_code": "+91" },
    isLoading: false,
    isVerified: false,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        unsetPhone: state => {
            state.phone = '';
        },
        setCountry: (state, action: PayloadAction<Country>) => {
            state.country = action.payload;
        },
        verifyProfile: state => {
            state.isVerified = true;
        },
        unverifyProfile: state => {
            state.isVerified = false;
        },
        profileAsyncTaskStart: state => {
            state.isLoading = true;
        },
        profileAsyncTaskEnd: state => {
            state.isLoading = false;
        },
    }
});

export const {setPhone, unsetPhone, setCountry, verifyProfile, unverifyProfile, profileAsyncTaskStart, profileAsyncTaskEnd } = profileSlice.actions;

export const selectPhone = (state: AppState) => state.profile.phone;
export const selectCountry = (state: AppState) => state.profile.country;
export const selectIsVerified = (state: AppState) => state.profile.isVerified;
export const selectIsLoading = (state: AppState) => state.profile.isLoading;

export default profileSlice.reducer;