import { useState } from 'react';
import { Navbar } from '../src/components/ui/header';
import { Editor } from '../src/components/editor/editor';
import { AuthPage } from '../src/components/common/auth';
import { WorkInfo } from '../src/libs/firestore';
import works from '../src/components/gallery/temp.json';

const Edit = () => {
  const [shader, setShader] = useState<WorkInfo | undefined>();
  setTimeout(() => {
    // if (id === 'new') return;
    // setShader((works as WorkInfo[]).find((work) => work.id === id) as WorkInfo);
  }, 100);
  return (
    <AuthPage>
      <div className="w-screen md:h-screen flex flex-col">
        <Navbar className="flex-grow-1" />
        <Editor className="flex-grow" shader={shader} />
      </div>
    </AuthPage>
  );
};

export default Edit;
