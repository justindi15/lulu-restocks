import admin from 'firebase-admin';
import { getEnvVar } from '../utils/getEnvVar';

const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = JSON.parse(getEnvVar(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS))

if (admin.apps.length === 0) {
    admin.initializeApp({
        credential: admin.credential.cert(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)
    });
}

export const firestore = admin.firestore();