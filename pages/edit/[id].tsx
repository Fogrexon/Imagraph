import { NextPageContext } from 'next';
import { Navbar } from '../../src/components/ui/header';
import { Editor } from '../../src/components/editor/editor';
import { AuthPage } from '../../src/components/common/auth';
import { WorkInfo } from '../../src/lib/firestore';
import works from '../../src/components/gallery/temp.json';

const Edit = ({shaderData}: {shaderData: WorkInfo | null | undefined}) => {
  setTimeout(() => {
    // if (id === 'new') return;
    // setShader((works as WorkInfo[]).find((work) => work.id === id) as WorkInfo);
  }, 100);
  return (
    <AuthPage>
      <div className="w-screen md:h-screen flex flex-col">
        <Navbar className="flex-grow-1" />
        <Editor className="flex-grow" shader={shaderData} />
      </div>
    </AuthPage>
  );
};

Edit.getInitialProps = async (ctx: NextPageContext) => {
  const shaderID = ctx.query.id;
  if (shaderID === 'new') return {};
  // eslint-disable-next-line consistent-return
  return { shaderData: (works as WorkInfo[]).find((work) => work.id === shaderID) as WorkInfo };
}

export default Edit;
