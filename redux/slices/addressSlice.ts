import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../../apis/get";
import { AppState } from "../store";

export interface AddressState {
    selectedAddress: Address | undefined;
    turboAddressList: Address[] | undefined;
    unifillAddressList: Address[] | undefined;
}

const initialState: AddressState = {
    selectedAddress: undefined,
    turboAddressList: [],
    unifillAddressList: [],
}

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setSelectedAddress: (state, action: PayloadAction<Address>) => {
            state.selectedAddress = action.payload;
        },
        unsetSelectedAddress: (state) => {
            state.selectedAddress = undefined
        },
        setTurboAddressList: (state, action: PayloadAction<Address[]>) => {
            state.turboAddressList = action.payload;
        },
        setUnifillAddressList: (state, action: PayloadAction<Address[]>) => {
            state.unifillAddressList = action.payload;
        },
    }
});

export const { setSelectedAddress, unsetSelectedAddress, setTurboAddressList, setUnifillAddressList } = addressSlice.actions;

export const selectSelectedAddress = (state: AppState) => state.address.selectedAddress;
export const selectTurboAddressList = (state: AppState) => state.address.turboAddressList;
export const selectUnifillAddressList = (state: AppState) => state.address.unifillAddressList;

export default addressSlice.reducer;