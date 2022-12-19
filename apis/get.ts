import { Addresses } from "../utils/interfaces";

const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'

/********************************************** BUYER ***********************************************************/
export async function getBuyerProfile(token: string): Promise<Addresses> {
    const res = await fetch(`${baseUrl}/buyer/v1/profile`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    return res.json();
}

export async function getPostalAddress(pincode: string): Promise<any> {
    const res = await fetch (`${baseUrl}/v1/pincode/${pincode}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('turbo')}`,
        }
    });
    return res.json();
}