import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { ReactNode, useContext } from 'react';
import { logout } from '../../lib/auth';
import { firebaseApp } from '../../lib/firebase';
import { AuthContext } from '../common/auth';
import { NotificationContext } from '../common/notification';
import { Actor } from './actor';
import { Button } from './button';

const ListItem = ({ children, small = false }: { children: ReactNode; small?: boolean }) => (
  <li className={`text-center w-full my-2${small ? ' text-sm' : ''}`}>{children}</li>
);

export const ProfileCard = () => {
  const { user } = useContext(AuthContext);
  const { dispatchNotification } = useContext(NotificationContext);
  const router = useRouter();
  const sessionLogout = () => {
    logout();
    getAuth(firebaseApp).signOut();
    dispatchNotification({ type: 'info', message: 'ログアウトしました' }).then(() => {
      router.push('/');
    });
  };
  return (
    <div className="absolute top-20 right-4 w-max-full w-80 shadow bg-white rounded-md">
      <section className="w-full p-2 my-4 border-b-2">
        <ul>
          <ListItem>
            <Actor size="large" src={user?.photoURL as string} />
          </ListItem>
          <ListItem>{user?.displayName}</ListItem>
          <ListItem small>{user?.id}</ListItem>
        </ul>
      </section>
      <section className="w-full text-center p-2 my-4">
        <Button primary small onClick={sessionLogout}>
          Logout
        </Button>
      </section>
    </div>
  );
};
