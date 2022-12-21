import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

// firstLoad for a key is undefined before first load, true after first load and before next load, and false after second load.
export interface NavigationState {
    firstLoad: {[page: string] : boolean};
}

const initialState: NavigationState = {
    firstLoad: {
        'addresses': true,
    }
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        setFirstLoad: (state, action: PayloadAction<string>) => {
            state.firstLoad[action.payload] = false;
        }
    }
});

export const { setFirstLoad } = navigationSlice.actions;

export const selectFirstLoad = (state: AppState) => state.navigation.firstLoad;

export default navigationSlice.reducer;