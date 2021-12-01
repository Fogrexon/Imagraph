import { NextPageContext } from 'next';
import { Navbar } from '../../src/components/ui/header';
import { Editor } from '../../src/components/editor/editor';
import { AuthPage } from '../../src/components/common/auth';
import works from '../../src/components/gallery/temp.json';
import { WorkInfo } from '../../src/lib/types';
import { getWorkList } from '../../src/lib/firestoreAdmin';

const Edit = ({ shaderData }: { shaderData: WorkInfo | null | undefined }) => {
  setTimeout(() => {
    // if (id === 'new') return;
    // setShader((works as WorkInfo[]).find((work) => work.id === id) as WorkInfo);
  }, 100);
  return (
    <AuthPage>
      <div className="w-screen md:h-screen flex flex-col">
        <Navbar className="flex-grow-1" />
        <Editor className="flex-grow" shader={shaderData as WorkInfo} shaderID="default" />
      </div>
    </AuthPage>
  );
};

Edit.getServerSideProps = async (ctx: NextPageContext) => {
  const shaderID = ctx.query.id;
  if (shaderID === 'new') return {};
  const data = await getWorkList()
  // eslint-disable-next-line consistent-return
  return { shaderData: (works as WorkInfo[]).find((work) => work.id === shaderID) as WorkInfo };
};

export default Edit;
