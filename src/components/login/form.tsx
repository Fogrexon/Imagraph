import { useRouter } from 'next/dist/client/router';
import React, { useContext } from 'react';
import { login } from '../../lib/auth';
import { NotificationContext } from '../common/notification';
import { Alert } from '../ui/alert';

const GoogleLogin = () => {
  const { dispatchNotification } = useContext(NotificationContext);
  const router = useRouter();

  const loginProcess = () => {
    login()
      .then(() => {
        // successfully logged in
        dispatchNotification({ type: 'info', message: 'ログインしました' }).then(() => {
          router.push('/gallery');
        });
      })
      .catch(() => {
        // catch some error
        dispatchNotification({ type: 'error', message: 'ログインに失敗しました' });
      });
  };

  return (
    <div className="w-11/12 h-11/12 relative px-3 py-6 shadow rounded-md">
      <button
        className="bg-red-500 px-4 py-2 text-white font-medium rounded-md"
        type="button"
        onClick={loginProcess}
      >
        Googleで新規登録/ログイン
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
    <div className="w-90 px-4 py-4 flex items-center justify-center">
      <Alert>サービスの利用にはログインが必要です</Alert>
    </div>
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
