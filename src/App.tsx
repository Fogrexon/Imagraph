import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { AuthProvider } from './components/common/auth';
import { Home } from './pages/index';
import { Gallery } from './pages/gallery';
import { Edit } from './pages/edit';
import { Login } from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Route path="/" component={Home} exact />
        <Route path="/gallery" component={Gallery} exact />
        <Route path="/edit" component={Edit} exact />
        <Route path="/login" component={Login} exact />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
