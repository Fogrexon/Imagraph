import { Navbar } from '../src/components/ui/header';
import { Introduction } from '../src/components/home/intro';
import { HeaderBase } from '../src/components/common/headerbase';
import { OgpCard } from '../src/components/common/ogp';
// import Index  from '../components/index/index';
// import Footer  from '../components/common/footer';

const Home = () => (
  <>
  <HeaderBase title="Imagraph">
    <OgpCard
      title="Imagraph"
      description="Create image filter by shader."
      url="/"
    />
  </HeaderBase>
    <Navbar />
    <Introduction />
  </>
);

export default Home;
