import { ServiceAccount } from "firebase-admin";

export const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
};
