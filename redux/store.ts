import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import settingsReducer from "./slices/settingsSlice";
import addressReducer from "./slices/addressSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            profile: profileReducer,
            settings: settingsReducer,
            address: addressReducer,
        }
    })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;