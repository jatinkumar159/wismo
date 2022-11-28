const baseUrl = 'http://localhost:4000';
// const baseUrl = 'https://unifill.unicommerce.co.in'

export async function verifyBuyer(phone: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/buyer/verify?mobile=${phone}`, {
        method: 'POST',
    });
    return res;
}

export async function sendOTP(phone: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/send?mobile=${phone}`, {
        method: 'POST',
    });
    return res;
}

export async function verifyOTP(otpRequestId: string, otp: string): Promise<Response> {
    const res = await fetch(`${baseUrl}/auth/v1/otp/verify?otp_request_id=${otpRequestId}&otp=${otp}`, {
        method: 'POST',
    });
    return res;
}