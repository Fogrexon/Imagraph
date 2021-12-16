import nookies from 'nookies';
import { NextPageContext } from 'next';
import { CardList } from '../src/components/gallery/cardlist';
import { Navbar } from '../src/components/ui/header';
import { WorkInfo } from '../src/lib/types';
import { firebaseAdmin } from '../src/lib/firebaseAdmin';
import { getWorkList } from '../src/lib/firestoreAdmin';

const Gallery = ({ items }: { items: WorkInfo[] }) => (
  <>
    <Navbar />
    <CardList items={items as WorkInfo[]} />
  </>
);
export default Gallery;

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

  const items = (await getWorkList(user.uid)) as WorkInfo[];

  return {
    props: { items },
  };
};
