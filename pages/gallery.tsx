import { AuthPage } from '../src/components/common/auth';
import { CardList } from '../src/components/gallery/cardlist';
import { Navbar } from '../src/components/ui/header';
import items from '../src/components/gallery/temp.json';
import {WorkInfo} from '../src/lib/types'

const Gallery = () => (
  <AuthPage>
    <Navbar />
    <CardList items={items as WorkInfo[]}/>
  </AuthPage>
);
export default Gallery;
