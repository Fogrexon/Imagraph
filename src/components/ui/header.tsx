import React, { ReactNode, useContext } from 'react';
import { AuthContext } from '../common/auth';
import { Actor } from './actor';

export const Link = ({ href, children }: { href: string; children: ReactNode }) => (
  <a
    href={href}
    className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-1 rounded-md md:mt-0 hover:bg-gray-300"
  >
    {children}
  </a>
);

const Bland = () => (
  <a href="/">
    <div className="px-4 py-1 mx-2 my-2 text-xl font-semibold text-gray-700">Imagraph</div>
  </a>
);

const NavbarLeft = () => (
  <div className="flex items-center justify-between">
    <Bland />
    <div className="flex items-center justify-between">
      <Link href="/gallery">Gallery</Link>
      <Link href="/edit?id=new">New</Link>
    </div>
  </div>
);

const NavbarRight = () => {
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <div className="h-12 flex items-center">
      {
        loggedIn ? <Link href="/mypage"><Actor />{user?.displayName as string}</Link> : <Link href="/login">Login</Link>
      }
      
    </div>
  );
}

export const Navbar = ({ className = "" }: { className?: string }) => (
  <nav className={`${className} bg-white shadow mx-0 my-0`}>
    <div className="flex items-center justify-between">
      <NavbarLeft />
      <NavbarRight />
    </div>
  </nav>
);
