// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'
// const baseUrl = 'https://unifill.unicommerce.co.in'

import gateway from './gateway';

export async function updateCart(cartId: string, type: string, data: any): Promise<Response> {
    const res = await gateway(`${baseUrl}/v1/cart/${cartId}`, `PATCH`, JSON.stringify({
            type,
            data
        })
    )
    return res;
}