import React from 'react';
import { AuthPage } from '../components/common/auth';
import { CardList } from '../components/gallery/cardlist';
import { Navbar } from '../components/ui/header';

export const Gallery = () => (
  <AuthPage>
    <Navbar />
    <CardList />
  </AuthPage>
);
