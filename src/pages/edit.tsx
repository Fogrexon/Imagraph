import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Navbar } from '../components/ui/header';
import { Editor } from '../components/editor/editor';
import { AuthPage } from '../components/common/auth';
import { WorkInfo } from '../libs/firestore';
import works from '../components/gallery/temp.json';

export const Edit = ({ match:  {params : { id }}}: RouteComponentProps<{id: string}>) => {
  const [shader, setShader] = useState<WorkInfo | undefined>()
  setTimeout(() => {
    if (id === 'new') return;
    setShader((works as WorkInfo[]).find(work => work.id === id) as WorkInfo);
  }, 100);
  return (
    <AuthPage>
      <div className="w-screen md:h-screen flex flex-col">
        <Navbar className="flex-grow-1" />
        <Editor className="flex-grow" shader={shader} />
      </div>
    </AuthPage>
  );
}
