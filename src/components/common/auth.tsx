import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';
import { Alert } from '../ui/alert';
import { ButtonLink } from '../ui/button';
import { User } from '../../lib/types';
import { onAuthStateChanged } from '../../lib/auth';

interface AuthContextProps {
  user: User | null;
  dispatcher?: (user: User | null) => void;
}
export const AuthContext = createContext<AuthContextProps>({ user: null });

const AuthAlert = ({ loggedIn = false }: { loggedIn?: boolean }) => {
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

export const AuthPage = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(AuthContext);

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
    onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
