import { ReactNode } from 'react';
import Head from 'next/head';

export const HeaderBase = ({ title, children }: { title: string; children: ReactNode }) => (
  <Head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="シェーダーを書いて自分だけのカメラフィルターを作りましょう" />
    <meta name="format-detection" content="telephone=no,address=no,email=no" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="robots" content="noindex,nofollow" />
    <title>{title}</title>
    {children}
  </Head>
);
