import { getHeaders } from './../utils/headers'

export default async function gateway(path: string, method: string = 'GET', payload?: any, headerSource: string = "base") {
  return fetch(path, {
    method,
    headers: getHeaders(method, headerSource),
    body: method === 'GET' ? null : payload
  })
}
