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

    if(localStorage.getItem('turbo')) headers.append('Authorization', `Bearer ${localStorage.getItem('turbo')}`);
    headers.append('X-NMerchantId', `merchant-01`);
    headers.append('user-agent', `${navigator.userAgent}`);
    headers.append('X-NPlatformInfo', JSON.stringify(platformInfo));
    if(method === 'POST' || method === 'PATCH') headers.append('Content-type', 'application/json');

    return headers;
}
