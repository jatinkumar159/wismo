import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

// firstLoad for a key is undefined before first load, true after first load and before next load, and false after second load.
interface NavigationState {
    firstLoad: {[page: string] : boolean};
    flowMap: {[page: string] : FlowState};
}

interface FlowState {
    title: string;
}

const initialState: NavigationState = {
    firstLoad: {
        'addresses': true,
    },
    flowMap: {
        '/profile': {
            title: 'MOBILE',
        },
        '/addresses': {
            title: 'ADDRESS',
        },
        '/add-address': {
            title: 'ADDRESS',
        },
        '/edit-address': {
            title: 'ADDRESS',
        },
        '/discounts': {
            title: 'PROMOS',
        },
        '/confirmation': {
            title: 'PAYMENT',
        },
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
export const selectFlowMap = (state: AppState) => state.navigation.flowMap;

export default navigationSlice.reducer;