import { Navbar } from "../src/components/ui/header";
import { NotFound as NotFoundMessage } from '../src/components/404/404';

const NotFound = () => (
  <>
    <Navbar />
    <NotFoundMessage />
  </>
);

export default NotFound;
