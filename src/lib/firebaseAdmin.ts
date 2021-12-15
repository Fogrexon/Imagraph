
import admin from 'firebase-admin';

const credentials = {
  "type": "service_account",
  "project_id": "glslfilter",
  "private_key_id": process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY_ID,
  "private_key": process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
  "client_email": process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_EMAIL,
  "client_id": process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT_ID,
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CLIENT,
}


export const firebaseAdmin = admin.apps[0] || admin.initializeApp({
    credential: admin.credential.cert(credentials as admin.ServiceAccount),
    databaseURL: "https://glslfilter-default-rtdb.firebaseio.com"
  })

export const firestore = admin.firestore();
export const auth = admin.auth();

export const verifyIdToken = async (
  token: string
): Promise<admin.auth.DecodedIdToken> => auth
  .verifyIdToken(token)
  .catch((error) => {
    console.error(error);

    throw new Error("有効なトークンではありません");
  });
