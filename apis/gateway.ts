import { getHeaders } from './../utils/headers';

export default async function gateway(path: string, method: string = 'GET', payload?: any) {
    return fetch(path, {
        method,
        headers: getHeaders(),
        body: method === 'GET' ? null : payload
    });
}