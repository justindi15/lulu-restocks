import admin from 'firebase-admin';
import * as env from 'env-var'

const GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = env.get('GOOGLE_SERVICE_ACCOUNT_CREDENTIALS').required().asJsonObject()
admin.initializeApp({
    credential: admin.credential.cert(GOOGLE_SERVICE_ACCOUNT_CREDENTIALS)
});

export const firestore = admin.firestore();