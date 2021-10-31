import React, { useState, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { auth as firebaseAuth } from '../../libs/firebase';
import { Loading } from '../ui/loading';
import { Alert } from '../ui/alert';
import { ButtonLink } from '../ui/button';

interface AuthInfo {
  loggedIn: boolean;
  checked: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthInfo>({
  loggedIn: false,
  checked: false,
  user: null,
});

const AuthAlert = ({ loading = true, loggedIn = false }: {loading?: boolean, loggedIn?: boolean}) => {
  if (loading) {
    return (
      <Loading />
    )
  }
  if (loggedIn) return <></>;
  return (
    <div>
      <Alert type="info">
        <p className="w-full text-center">Login is Required</p>
        <div><ButtonLink small href="/">Home</ButtonLink><ButtonLink small href="/login">Login</ButtonLink></div>
      </Alert>
    </div>
  )
}

export const AuthPage = ({ children }: { children: any }) => {
  const { loggedIn, checked } = useContext(AuthContext);

  return (
    <div className="relative">
      <div
        className={`w-full m-0 p-0${checked && loggedIn ? '' : ' blur-md'}`}
        style={{
          filter: checked && loggedIn ? 'none' : 'blur(12px)',
        }}
      >
        {children}
      </div>
      <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center${checked && loggedIn ? ' hidden' : ''}`}>
        <AuthAlert loading={!checked} loggedIn={loggedIn} />
      </div>
    </div>
  );
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [cookie, setCookie] = useCookies(['authToken']);

  const [loggedIn, setLoginStatus] = useState(!!cookie);
  const [checked, setChecked] = useState(!!cookie);
  const [user, setUser] = useState<User | null>(null);

  firebaseAuth.onAuthStateChanged(async (userData) => {
    setChecked(true);
    setLoginStatus(!!userData);
    setUser(userData);
    setCookie('authToken', await userData?.getIdToken());
  });

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        checked,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
