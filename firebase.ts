// Import the functions you need from the SDKs you need
import { Analytics, getAnalytics, logEvent } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDxVYOatDHgIj8dKKFui31fNGjyfCB9DoA',
  authDomain: 'wismo-99cf7.firebaseapp.com',
  projectId: 'wismo-99cf7',
  storageBucket: 'wismo-99cf7.appspot.com',
  messagingSenderId: '39292991240',
  appId: '1:39292991240:web:8e16f688a3c1cec95f1ebd',
  measurementId: 'G-21QVM189SQ'
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
