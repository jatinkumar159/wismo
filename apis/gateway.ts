import { getHeaders } from './../utils/headers';

export default async function gateway(path: string, method: string = 'GET', payload?: any) {
    const headers = getHeaders();
    if(method === 'POST') headers.append('Content-Type', 'application/json');

    return fetch(path, {
        method,
        headers: headers,
        body: method === 'GET' ? null : payload
    });
}