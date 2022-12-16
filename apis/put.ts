import { Address } from "./get";

// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'
// const baseUrl = 'https://unifill.unicommerce.co.in'

interface EditAddress {
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
    email?: string;
}

export async function editAddress(address: any): Promise<Response> {
    const res = await fetch(`${baseUrl}/buyer/v1/address`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('turbo')}`,
        },
        body: JSON.stringify(address),
    });

    return res;
}