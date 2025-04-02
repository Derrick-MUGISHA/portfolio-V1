import { initializeApp, getApps, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { getAuth } from "firebase-admin/auth"

// Initialize Firebase Admin
export function initAdmin() {
  const apps = getApps()

  if (!apps.length) {
    const serviceAccount = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }

    initializeApp({
      credential: cert(serviceAccount),
    })
  }

  return {
    db: getFirestore(),
    auth: getAuth(),
  }
}

// Get Firebase Admin instances
export function getAdmin() {
  const { db, auth } = initAdmin()
  return { db, auth }
}

