import React, { useState, createContext, useContext, useEffect } from 'react';
import nookies from 'nookies';
import { firebaseApp } from '../../lib/firebase';
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { Alert } from '../ui/alert';
import { ButtonLink } from '../ui/button';
import { User } from '../../lib/types';

export const AuthContext = createContext<User | null>(null);

const AuthAlert = ({
  loggedIn = false,
}: {
  loggedIn?: boolean;
}) => {
  if (loggedIn) return <></>;
  return (
    <div>
      <Alert type="info">
        <p className="w-full text-center">Login is Required</p>
        <div>
          <ButtonLink small href="/">
            Home
          </ButtonLink>
          <ButtonLink small href="/login">
            Login
          </ButtonLink>
        </div>
      </Alert>
    </div>
  );
};

export const AuthPage = ({ children }: { children: any }) => {
  const user = useContext(AuthContext);

  return (
    <div className="relative">
      <div
        className={`relative w-full m-0 p-0${user ? '' : ' blur-md'}`}
        style={{
          filter: user ? 'none' : 'blur(12px)',
        }}
      >
        {children}
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center${
          user ? ' hidden' : ''
        }`}
      >
        <AuthAlert loggedIn={!!user} />
      </div>
    </div>
  );
};

export const AuthProvider = ({ children }: { children: any }) => {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (userData: FirebaseUser | null) => {
      setChecked(true);
      setLoginStatus(!!userData);
      setUser(await getUser(await userData?.getIdToken() as string));
      setCookie('authToken', await userData?.getIdToken());
      if (userData) {
        initializeWorkCollection(await userData?.getIdToken());
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handle = setInterval(async () => {
      const userData = firebaseAuth.currentUser as firebase.User;
      if (user) await userData.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
  );
};
