const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'

/********************************************** BUYER ***********************************************************/
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