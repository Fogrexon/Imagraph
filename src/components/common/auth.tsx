import { useState, createContext, useContext } from 'react';
import { User } from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { auth as firebaseAuth } from '../../libs/firebase';

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

export const AuthPage = ({ children }: { children: any }) => {
  const { loggedIn, checked } = useContext(AuthContext);

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: '0px',
          padding: '0px',
          filter: checked && loggedIn ? 'none' : 'blur(12px)',
        }}
      >
        {children}
      </div>
      {!checked || !loggedIn ? <div>{!checked ? 'Loading...' : <>Login is required.</>}</div> : ''}
    </>
  );
};

const AuthProvider = ({ children }: { children: any }) => {
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

export default AuthProvider;
