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

export function logTrackingPageVisit(tenantId: string, orderNumber: string, phoneNumber: string, trackingNumber: string): void {
  logEvent(analytics, 'page_view', {
    tenant_id: tenantId,
    order_number: orderNumber,
    phone_number: phoneNumber,
    tracking_number: trackingNumber
  })
}

export function logLoginClick(trackingNumber: string): void {
  logEvent(analytics, 'login_click', {
    tracking_number: trackingNumber
  })
}

export function logLogin(trackingNumber: string): void {
  logEvent(analytics, 'login', {
    tracking_number: trackingNumber
  })
}
