// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBaROZAt9Z94Yc0Hfsm2yXGeX2lL84Ta3c',
  authDomain: 'unilog-wismo.firebaseapp.com',
  projectId: 'unilog-wismo',
  storageBucket: 'unilog-wismo.appspot.com',
  messagingSenderId: '904221377967',
  appId: '1:904221377967:web:eb694e23b8b73b1fecdb5a',
  measurementId: 'G-HCG389TMEN'
}

// Initialize Firebase
let analytics: Analytics
const app = initializeApp(firebaseConfig)
if (app.name && typeof window !== 'undefined') {
  analytics = getAnalytics(app)
}

export function logTrackingPageVisit(tenantCode: string, orderNumber: string, phoneNumber: string, trackingNumber: string): void {
  logEvent(analytics, 'page_view', {
    tenant_code: tenantCode,
    order_number: orderNumber,
    phone_number: phoneNumber,
    tracking_number: trackingNumber
  })
}

export function logLoginClick(tenantCode: string, orderNumber: string, phoneNumber: string, trackingNumber: string): void {
  logEvent(analytics, 'login_click', {
    tenant_code: tenantCode,
    order_number: orderNumber,
    phone_number: phoneNumber,
    tracking_number: trackingNumber
  })
}

export function logLogin(tenantCode: string, orderNumber: string, phoneNumber: string, trackingNumber: string): void {
  logEvent(analytics, 'login', {
    tenant_code: tenantCode,
    order_number: orderNumber,
    phone_number: phoneNumber,
    tracking_number: trackingNumber
  })
}

export function logOrderItemView(tenantCode: string, orderNumber: string, phoneNumber: string, trackingNumber: string): void {
  logEvent(analytics, 'order_item_view', {
    tenant_code: tenantCode,
    order_number: orderNumber,
    phone_number: phoneNumber,
    tracking_number: trackingNumber
  })
}
