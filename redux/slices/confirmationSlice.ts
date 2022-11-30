import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface Coupon {
    code: string;
    discountPercentage: number;
    discountAmount: number;
    maxDiscount: number;
}
export interface ConfirmationState {
    availableCoupons: Coupon[],
    selectedCoupon: Coupon | null,
}

const initialState: ConfirmationState = {
    availableCoupons: [],
    selectedCoupon: null,
}

export const confirmationSlice = createSlice({
    name: 'confirmation',
    initialState,
    reducers: {
        setAvailableCoupons: (state, action: PayloadAction<Coupon[]>) => {
            state.availableCoupons = action.payload;
        },
        setSelectedCoupon: (state, action: PayloadAction<Coupon>) => {
            state.selectedCoupon = action.payload;
        },
        unsetSelectedCoupon: (state) => {
            state.selectedCoupon = null;
        }
    }
});

export const {setAvailableCoupons, setSelectedCoupon, unsetSelectedCoupon } = confirmationSlice.actions;

export const availableCoupons = (state: AppState) => state.confirmation.availableCoupons;
export const selectedCoupon = (state: AppState) => state.confirmation.selectedCoupon;

export default confirmationSlice.reducer;