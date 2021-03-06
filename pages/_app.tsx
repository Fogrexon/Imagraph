/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/react-in-jsx-scope */
// eslint-disable-next-line import/no-extraneous-dependencies
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/components/common/auth';
import { NotificationProvider } from '../src/components/common/notification';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NotificationProvider>
  );
}
export default MyApp;
