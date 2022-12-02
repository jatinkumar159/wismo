const baseUrl = 'http://localhost:4000';
// const baseUrl = 'https://unifill.unicommerce.co.in'

export interface Addresses {
    mobile: string;
    turbo_address_list: Address[];
    unifill_address_list: Address[];
}

export interface Address {
    address_id: string;
    name: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    district?: string;
    state: string;
    country: string;
    pincode: string;
    address_type?: string;
    selected: boolean;
}

export async function getAddresses(phone: string): Promise<Addresses> {
    const res = await fetch(`${baseUrl}/buyer/v1/profile?mobile=${phone}`);
    return res.json();
}

export async function getPostalAddress(pincode: string): Promise<any> {
    const res = await fetch (`https://api.postalpincode.in/pincode/${pincode}`);
    return res.json();
}