import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../common/auth';
import { Actor } from './actor';
import { ButtonLink } from './button';

export const PageLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    to={href}
    className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-1 rounded-md md:mt-0 hover:bg-gray-300"
  >
    {children}
  </Link>
);

const Bland = () => (
  <Link to="/">
    <div className="px-4 py-1 mx-2 my-2 text-xl font-semibold text-gray-700">Imagraph</div>
  </Link>
);

const NavbarLeft = () => (
  <div className="flex items-center justify-between">
    <Bland />
    <div className="flex items-center justify-between">
      <ButtonLink small href="/gallery">
        Gallery
      </ButtonLink>
      <ButtonLink small href="/edit?id=new">
        New
      </ButtonLink>
    </div>
  </div>
);

const NavbarRight = () => {
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <div className="h-12 flex items-center">
      {loggedIn ? (
        <ButtonLink small href="/mypage">
          <Actor />
          {user?.displayName as string}
        </ButtonLink>
      ) : (
        <ButtonLink href="/login">Login</ButtonLink>
      )}
    </div>
  );
};

export const Navbar = ({ className = '' }: { className?: string }) => (
  <nav className={`${className} bg-white shadow mx-0 my-0`}>
    <div className="flex items-center justify-between">
      <NavbarLeft />
      <NavbarRight />
    </div>
  </nav>
);
