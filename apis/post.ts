import { getHeaders } from "../utils/headers";
import { NewAddress } from "../utils/interfaces";

const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'

/********************************************** BUYER ***********************************************************/
export async function verifyBuyer(phone: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/buyer/verify?mobile=${phone}`, {
        method: 'POST',
        headers: getHeaders(),
    });
    return res;
}

export async function sendOTP(phone: string, template: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/send?mobile=${phone}&template=${template}`, {
        method: 'POST',
        headers: getHeaders(),
    });
    return res;
}

export async function resendOTP(otpRequestId: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/resend?otp_request_id=${otpRequestId}`, {
        method: 'POST',
        headers: getHeaders(),
    });
    return res;
}

export async function verifyOTP(otpRequestId: string, otp?: string): Promise<Response> {
    const headers = getHeaders();
    headers.append('Content-type', 'application/json');

    const res = await fetch(`${baseUrl}/auth/v1/otp/verify`, {
        method: 'POST',
        body: JSON.stringify({
            'otp_request_id': otpRequestId,
            'otp': otp,
        }),
        headers
    });
    return res;
}

export async function addNewAddress(address: NewAddress): Promise<Response> {
    const headers = getHeaders();
    headers.append('Content-type', 'application/json');

    const res = await fetch(`${baseUrl}/buyer/v1/address`, {
        method: 'POST', 
        body: JSON.stringify(address),
        headers
    });
    return res;
}

/********************************************** CART ***********************************************************/
export async function createCart(platform: string, merchantId: string, mobileNumber: string, platformCart?: any, address?: any): Promise<Response> {
    const res = await fetch(`${baseUrl}/v1/cart`, {
        method: 'POST',
        body: JSON.stringify({
            platform: platform,
            merchant_id: merchantId,
            mobile_number: mobileNumber,
            platform_cart: platformCart,
            address: address,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    });
    return res;
}