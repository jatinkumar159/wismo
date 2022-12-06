import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface Coupon {
    code: string;
    discountPercentage?: number;
    discountAmount?: number;
    maxDiscount: number;
}
export interface ConfirmationState {
    availableCoupons: Coupon[],
    selectedCoupon: Coupon | null,
}

const initialState: ConfirmationState = {
    availableCoupons: [
        {
            code: 'WORLDCUP2022',
            discountPercentage: 50,
            discountAmount: 500,
            maxDiscount: 500,
        },
        {
            code: 'NEWYEAR_FIESTA',
            discountPercentage: 20,
            discountAmount: 200,
            maxDiscount: 200,
        }
    ],
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

export const selectAvailableCoupons = (state: AppState) => state.confirmation.availableCoupons;
export const selectSelectedCoupon = (state: AppState) => state.confirmation.selectedCoupon;

export default confirmationSlice.reducer;