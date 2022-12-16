// const baseUrl = 'http://localhost:4000';
const baseUrl = 'https://turbo-dev.unicommerce.co.in/turbo'
// const baseUrl = 'https://unifill.unicommerce.co.in'

export async function updateCart(cartId: string, type: string, data: any): Promise<Response> {
    const res = await fetch(`${baseUrl}/v1/cart/${cartId}`, {
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            type,
            data,
        })
    });
    return res;
}