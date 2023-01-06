import gateway from "./gateway";
const PATH = "https://qa-unishipper.unicommerce.com";
export async function fetchTracking(tracking_number: string): Promise<any> {
    const res = await gateway(`${PATH}/api/buyer/tracking`, 'POST', JSON.stringify({
        tracking_number: tracking_number
    }));
    return res.json();
}