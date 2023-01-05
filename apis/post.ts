import gateway from "./gateway";
const PATH = "http://localhost:4001";
export async function fetchTracking(tracking_number: string): Promise<any> {
    const res = await gateway(`${PATH}/api/buyer/tracking`, 'POST', JSON.stringify({
        tracking_number: tracking_number
    }));
    return res.json();
}