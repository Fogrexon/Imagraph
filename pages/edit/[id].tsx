import { NextPageContext } from 'next';
import nookies from 'nookies';
import { Navbar } from '../../src/components/ui/header';
import { Editor } from '../../src/components/editor/editor';
import { AuthPage } from '../../src/components/common/auth';
import { WorkInfo } from '../../src/lib/types';
import { firebaseAdmin } from '../../src/lib/firebaseAdmin';

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

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || "";

  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null);
  
  console.log(session);
  
  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: {
        id: await user.getIdToken(),
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
    }
  }
  
  // shaders
  
  // const shaderID = ctx.query.id;
  // if (shaderID === 'new') return {};
  // const data = await getWorkList()
  // // eslint-disable-next-line consistent-return
  // return { shaderData: (works as WorkInfo[]).find((work) => work.id === shaderID) as WorkInfo };
};

export default Edit;
