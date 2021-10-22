import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Home } from './pages/index';
import { Gallery } from './pages/gallery';
import { MyPage } from './pages/mypage';
import { Edit } from './pages/edit';
import { AuthProvider, AuthPage } from './components/common/auth';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" component={Home} exact />
        <AuthPage>
          <Route path="/gallery" component={Gallery} exact />
          <Route path="/mypage" component={MyPage} exact />
          <Route path="/edit" component={Edit} exact />
        </AuthPage>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
