import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./slices/profileSlice";

export function makeStore() {
    return configureStore({
        reducer: {
            profile: profileReducer
        }
    })
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;