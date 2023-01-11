export interface Auth {
  isAuthorized: boolean | undefined
  setAuthorization: Function
  phoneNumber: string | undefined
  setPhoneNumber: Function
}
