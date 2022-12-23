import { getPlatformData } from "./platform";

export function getHeaders(method: string): Headers {
    const headers = new Headers();

    let platformInfo: any = {};

    if(navigator.userAgentData) {
        platformInfo.platform = navigator.userAgentData.platform, platformInfo.isMobile = navigator.userAgentData.mobile;
    }
    else {
        platformInfo.platform = getPlatformData();
        platformInfo.isMobile = window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;
    }

    if(localStorage.getItem('turbo')) headers.append('Authorization', `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc19ndWVzdF91c2VyIjpmYWxzZSwic3ViIjoiKzkxODI3OTcwMTI2NyIsImlhdCI6MTY3MTcwNzI5MiwiZXhwIjoxNzAzMjQzMjkyfQ.FjtDKOXrHJ8VnISGEEHWJrQboj_ciIkXLZlQFAAaWyrFqroj3JYf7g_YzoHlV-aoY6xqleL5FoK3UpYZJDfQsw`);
    headers.append('X-NMerchantId', `mid1`);
    headers.append('user-agent', `${navigator.userAgent}`);
    headers.append('X-NPlatformInfo', 'SHOPIFY');
    if(method === 'POST' || method === 'PATCH') headers.append('Content-type', 'application/json');

    return headers;
}
