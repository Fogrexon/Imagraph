import React, { createRef, ReactNode, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../common/auth';
import { Actor } from './actor';
import { Button, ButtonLink } from './button';
import { ProfileCard } from './profile-card';

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
  const [open, setOpen] = useState(false);
  const modalParentRef = createRef<HTMLDivElement>();
  const openButton = () => {
    setOpen(true);
  }
  
  useEffect(() => {
    const documentClickHandler = (parent: HTMLDivElement | null) => (e: MouseEvent) => {
      if (!parent || parent?.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener('click', documentClickHandler(modalParentRef?.current));
    return () => document.removeEventListener('click', documentClickHandler(modalParentRef?.current));
  }, []);
  return (
    <div ref={modalParentRef} className="h-12 flex items-center">
      {loggedIn ? (
        <>
          <Button onClick={() => openButton()} small>
            <Actor src={user?.photoURL} />
            {user?.displayName as string}
          </Button>
          <div className={`z-50 ${open ? '' : 'hidden'}`}>
            <ProfileCard />
          </div>
        </>
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
