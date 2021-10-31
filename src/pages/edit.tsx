import React from 'react';
import { Navbar } from '../components/ui/header';
import { Editor } from '../components/editor/editor';
import { AuthPage } from '../components/common/auth';

export const Edit = () => (
  <AuthPage>
    <div className="w-screen md:h-screen flex flex-col">
      <Navbar className="flex-grow-1" />
      <Editor className="flex-grow" />
    </div>
  </AuthPage>
);
