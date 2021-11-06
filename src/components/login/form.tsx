import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { createUser, hasUser } from '../../lib/firestore';
import { Alert } from '../ui/alert';

const GoogleLogin = () => {
  const [loggedIn, setLoggedIn] = useState<boolean | string>(false);
  const loginProcess = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const { user } = result;

        setLoggedIn(true);
        hasUser(user.uid).then((flag) => {
          if (!flag) {
            createUser(user.uid, user.displayName as string);
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setLoggedIn(`${errorCode} : ${errorMessage}`);
      });
  };

  return (
    <div className="w-11/12 h-11/12 relative px-3 py-6 shadow rounded-md">
      {
        // eslint-disable-next-line no-nested-ternary
        loggedIn === true ? (
          <>
            <Alert>Success. </Alert>
          </>
        ) : loggedIn === false ? (
          ''
        ) : (
          loggedIn
        )
      }
      <button
        className="bg-red-500 px-4 py-2 text-white font-medium rounded-md"
        type="button"
        onClick={loginProcess}
      >
        Googleでログイン
      </button>
    </div>
  );
};

const InputForm = ({ type, placeholder }: { type: string; placeholder: string }) => (
  <input type={type} placeholder={placeholder} className="mx-1 my-2 px-1 py-1 border" disabled />
);

const PasswordLogin = () => (
  <div className="w-11/12 h-11/12 relative px-3 py-6 shadow rounded-md">
    <div>
      <InputForm type="text" placeholder="username" />
      <InputForm type="password" placeholder="password" />
    </div>
    <div>
      <button
        type="button"
        className="bg-blue-500 text-white mx-1 my-2 px-4 py-2 rounded-md"
        disabled
      >
        Login
      </button>
    </div>
    <div className="w-full h-full bg-gray-700 bg-opacity-40 absolute top-0 left-0 text-white flex items-center justify-center font-semibold">
      利用できません
    </div>
  </div>
);

const LoginCard = () => (
  <div className="flex flex-col shadow">
    <div className="px-4 py-4 flex items-center justify-center shadow">ログイン</div>
    <div className="flex xl:flex-row flex-col items-center justify-between">
      <div className="xl:w-2/4 w-full flex items-center justify-center px-6 py-6 relative">
        <PasswordLogin />
      </div>
      <div className="xl:w-2/4 md:w-full flex items-center justify-center px-6 py-6 relative">
        <GoogleLogin />
      </div>
    </div>
  </div>
);

export const LoginForm = () => (
  <div className="container px-6 py-16 mx-auto text-center flex items-center justify-center">
    <div className="px-44 py-10">
      <LoginCard />
    </div>
  </div>
);
