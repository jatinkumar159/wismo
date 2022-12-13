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
    const res = await fetch(`${baseUrl}/auth/v1/buyer/verify?mobile=${phone}`, {
        method: 'POST',
    });
    return res;
}

export async function sendOTP(phone: string, template: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/send?mobile=${phone}&template=${template}`, {
        method: 'POST',
    });
    return res;
}

export async function resendOTP(otpRequestId: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/resend?otp_request_id=${otpRequestId}`, {
        method: 'POST',
    });
    return res;
}

export async function verifyOTP(otpRequestId: string, otp?: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/verify`, {
        method: 'POST',
        body: JSON.stringify({
            'otp_request_id': otpRequestId,
            'otp': otp,
        }),
        headers: {
            'Content-type': 'application/json'  
        },
    });
    return res;
}

export async function addNewAddress(address: NewAddress): Promise<Response> {
    const res = await fetch(`${baseUrl}/buyer/v1/address`, {
        method: 'POST', 
        body: JSON.stringify(address),
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('turbo')}`
        }
    });
    return res;
}