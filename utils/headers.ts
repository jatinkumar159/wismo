export function getHeaders(method: string, headerSource: string | undefined): Headers {
  const headers = new Headers()

  if (method === 'POST') headers.append('Content-type', 'application/json')

  if (headerSource === 'otp') {
    headers.append('Authorization', 'Basic dXNlcjpwYXNzd29yZA==')
  } else {
    headers.append('APP-KEY', '#$%^SK&SNLSH*^%SF')
  }
  if(method !== 'GET') headers.append('Content-type', 'application/json');
  return headers
}
