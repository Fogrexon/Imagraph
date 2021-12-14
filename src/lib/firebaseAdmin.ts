
import admin from 'firebase-admin';

import serviceAccount from './firebase-admin.json';

export const firebaseAdmin = admin.apps[0] || admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
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
