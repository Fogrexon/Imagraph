import { NextPageContext } from 'next';
import nookies from 'nookies';
import { Navbar } from '../../src/components/ui/header';
import { Editor } from '../../src/components/editor/editor';
import { WorkInfo } from '../../src/lib/types';
import { firebaseAdmin } from '../../src/lib/firebaseAdmin';
import { getWorkList } from '../../src/lib/firestoreAdmin';
import { HeaderBase } from '../../src/components/common/headerbase';
import { OgpCard } from '../../src/components/common/ogp';

const Edit = ({ shaderData }: { shaderData: WorkInfo }) => (
  <>
    <HeaderBase title={shaderData.detail.title}>
      <OgpCard
        title={shaderData.detail.title}
        description="Edit shader"
        url={`/edit/${shaderData.id}`}
       />
    </HeaderBase>
    <div className="w-screen md:h-screen flex flex-col">
      <Navbar className="flex-grow-1" />
      <Editor className="flex-grow" shader={shaderData as WorkInfo} shaderID="default" />
    </div>
  </>
);

export const getServerSideProps = async (ctx: NextPageContext) => {
  const cookies = nookies.get(ctx);
  const session = cookies.session || '';

  const user = await firebaseAdmin
    .auth()
    .verifySessionCookie(session, true)
    .catch(() => null);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const shaderID = ctx.query.id;
  if (shaderID === 'new') return { props: {} };
  const data = ((await getWorkList(user.uid)) as WorkInfo[]).find((work) => work.id === shaderID);

  if (!data) {
    return {
      notFound: true,
    };
  }
  // eslint-disable-next-line consistent-return
  return { props: { shaderData: data as WorkInfo } };
};

export default Edit;
