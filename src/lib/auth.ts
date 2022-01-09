import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as onFirebaseAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { firebaseApp } from './firebase';
import { User } from './types';

const provider = new GoogleAuthProvider();

export const login = async () => {
  const auth = getAuth(firebaseApp);
  const result = await signInWithPopup(auth, provider);

  const id = await result.user.getIdToken();

  await fetch(
    '/api/login',
    {
      method: 'POST',
      body: JSON.stringify(
        {
          token: id,
          id: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        }
      )
    }
  );
};

export const logout = () => fetch('/api/logout', { method: 'POST' });

export const onAuthStateChanged = (callback: (user: User | null) => void) => {
  const auth = getAuth(firebaseApp);

  onFirebaseAuthStateChanged(auth, (user) => {
    const userInfo: User | null = user
      ? {
          id: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }
      : null;
    callback(userInfo);
  });
};
