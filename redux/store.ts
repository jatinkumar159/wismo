import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";
import settingsReducer from "./slices/settingsSlice"

export function makeStore() {
    return configureStore({
        reducer: {
            profile: profileReducer,
            settings: settingsReducer,
        }
    })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;