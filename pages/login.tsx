import { Navbar } from '../src/components/ui/header';
import { LoginForm } from '../src/components/login/form';
import { HeaderBase } from '../src/components/common/headerbase';
import { OgpCard } from '../src/components/common/ogp';

const Login = () => (
  <>
    <HeaderBase title="Imagraph-Login">
      <OgpCard
        title="Login"
        description="Login or sign up to Imagrah"
        url="/login"
      />
    </HeaderBase>
    <Navbar />
    <LoginForm />
  </>
);
export default Login;
