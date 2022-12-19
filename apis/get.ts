import { getHeaders } from "../utils/headers";
import gateway from './gateway';

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'
// const baseUrl = 'https://unifill.unicommerce.co.in'

export interface Addresses {
    mobile: string;
    turbo_address_list: Address[];
    unifill_address_list: Address[];
}

export interface Address {
    address_id: string;
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
    selected: boolean;
    email?: string;
}

export async function getBuyerProfile(token: string): Promise<Addresses> {
    const res = await gateway(`${baseUrl}/buyer/v1/profile`, 'GET');
    return res.json();
}

export async function getPostalAddress(pincode: string): Promise<any> {
    const res = await gateway(`${baseUrl}/v1/pincode/${pincode}`, 'GET');
    return res.json();
}