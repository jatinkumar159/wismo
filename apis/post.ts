import { getHeaders } from "../utils/headers";
import gateway from './gateway';

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'
// const baseUrl = 'https://unifill.unicommerce.co.in'

export interface NewAddress {
    mobile: string;
    name: string;
    address_line1: string;
    address_line2: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pincode: string;
    address_type: string;
    email?: string;
}

export async function verifyBuyer(phone: string): Promise<Response> {
    const res = await gateway(`${baseUrl}/auth/v1/buyer/verify?mobile=${phone}`, `POST`, {});
    return res;
}

export async function sendOTP(phone: string, template: string): Promise<Response> {
    const res = await gateway(`${baseUrl}/auth/v1/otp/send?mobile=${phone}&template=${template}`, `POST`, {});
    return res;
}

export async function resendOTP(otpRequestId: string): Promise<Response> {
    const res = await gateway(`${baseUrl}/auth/v1/otp/resend?otp_request_id=${otpRequestId}`, `POST`, {});
    return res;
}

export async function verifyOTP(otpRequestId: string, otp?: string): Promise<Response> {
    const res = await gateway(`${baseUrl}/auth/v1/otp/verify`, `POST`, JSON.stringify({
            'otp_request_id': otpRequestId,
            'otp': otp,
        }),
    );
    return res;
}

export async function addNewAddress(address: NewAddress): Promise<Response> {
    const res = await gateway(`${baseUrl}/buyer/v1/address`, `POST`, JSON.stringify(address));
    return res;
}

export async function createCart(platform: string, merchantId: string, mobileNumber: string, platformCart?: any, address?: any): Promise<Response> {
    // const res = await fetch(`${baseUrl}/v1/cart`, {
    //     method: 'POST',
        // body: JSON.stringify({
        //     platform: platform,
        //     merchant_id: merchantId,
        //     mobile_number: mobileNumber,
        //     platform_cart: platformCart,
        //     address: address,
        // }),
    //     headers: {
    //         'Content-type': 'application/json',
    //     }
    // });
    // return res;

    const res = await gateway(`${baseUrl}/v1/cart`, `POST`, JSON.stringify({
        platform: platform,
        merchant_id: merchantId,
        mobile_number: mobileNumber,
        platform_cart: platformCart,
        address: address,
    }));
    return res;

}