export interface Auth {
  isAuthorized: boolean | undefined
  checkAuthorization: Function
  phoneNumber: string | undefined
  setPhoneNumber: Function
  trackingNumber: string | undefined
  setTrackingNumber: Function
}
