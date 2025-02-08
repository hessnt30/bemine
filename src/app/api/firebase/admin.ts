// src/firebase/firebaseAdmin.ts
import admin from "firebase-admin";
import { serviceAccount } from "@/app/api/firebase/bemine-2fe8b-firebase-adminsdk-fbsvc-6333a75099";
// import { serviceAccount } from "./screenshotthis-bb478-firebase-adminsdk-fbsvc-86036c6225";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export const db = admin.firestore();
export const adminAuth = admin.auth();
export const adminStorage = admin.storage();
