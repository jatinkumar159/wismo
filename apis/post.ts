import gateway from './gateway'

// const PATH = 'https://qa-unishipper.unicommerce.com'
const PATH = 'http://localhost:4001'

export async function fetchTracking(tracking_number: string): Promise<any> {
  const res = await gateway(
    `${PATH}/api/buyer/tracking`,
    'POST',
    JSON.stringify({
      tracking_number: tracking_number
    })
  )
  return res.json()
}

export async function sendOTP(phoneNumber: string): Promise<any> {
  const res = await gateway(
    `${PATH}/communication/v1/otp/send`,
    'POST',
    JSON.stringify({
      recipient: phoneNumber,
      channel: 'SMS'
    })
  )
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function verifyOTP(otpRequestId: string, otp: string): Promise<any> {
  const res = await gateway(
    `${PATH}/communication/v1/otp/verify`,
    'POST',
    JSON.stringify({
      otp_request_id: otpRequestId,
      otp: otp
    })
  )
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}

export async function resendOTP(otpRequestId: string): Promise<any> {
  const res = await gateway(
    `${PATH}/communication/v1/otp/resend`,
    'PATCH',
    JSON.stringify({
      otp_request_id: otpRequestId
    })
  )
  if (!res.ok) throw new Error(res.statusText)
  return res.json()
}
