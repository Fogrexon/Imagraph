import { AuthPage } from '../src/components/common/auth';
import { CardList } from '../src/components/gallery/cardlist';
import { Navbar } from '../src/components/ui/header';

const Gallery = () => (
  <AuthPage>
    <Navbar />
    <CardList />
  </AuthPage>
);
export default Gallery;
