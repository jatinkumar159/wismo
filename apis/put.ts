import gateway from "./gateway";

const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'

/********************************************** BUYER ***********************************************************/
export async function editAddress(address: any): Promise<Response> {
    const res = await gateway(`${baseUrl}/buyer/v1/address`, `PUT`, JSON.stringify(address));
    return res;
}