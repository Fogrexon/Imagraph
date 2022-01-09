import { Navbar } from '../src/components/ui/header';
import { NotFound as NotFoundMessage } from '../src/components/404/404';
import { HeaderBase } from '../src/components/common/headerbase';
import { OgpCard } from '../src/components/common/ogp';

const NotFound = () => (
  <>
    <HeaderBase title="Not Found">
      <OgpCard title="NotFound" description="Not Found" url="/404" />
    </HeaderBase>
    <Navbar />
    <NotFoundMessage />
  </>
);

export default NotFound;
