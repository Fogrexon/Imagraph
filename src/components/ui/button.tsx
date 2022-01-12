import React, { ReactNode, MouseEventHandler } from 'react';
import Link from 'next/link';

export const Button = ({
  children,
  onClick,
  small = false,
  primary = false,
}: {
  children: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick: MouseEventHandler<HTMLButtonElement>;
  small?: boolean;
  primary?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-block mx-2 my-2${
      small ? ' px-2 py-1 text-sm font-medium rounded-md' : ' px-4 py-2 rounded-xl'
    } transition-colors duration-1 ${
      primary
        ? 'bg-blue-700 text-white hover:bg-blue-900'
        : 'text-gray-700 bg-opacity-0 bg-gray-700 hover:bg-opacity-20'
    }`}
  >
    {children}
  </button>
);

export const ButtonLink = ({
  primary = false,
  small = false,
  href,
  children,
  target = '',
}: {
  primary?: boolean;
  small?: boolean;
  href: string;
  children: ReactNode;
  target?: string;
}) => (
  <Link href={href} passHref>
    <a
      href="dummy"
      className={`inline-block mx-2 my-2${
        small ? ' px-2 py-1 text-sm font-medium rounded-md' : ' px-4 py-2 rounded-xl'
      } transition-colors duration-1 ${
        primary
          ? 'bg-blue-700 text-white hover:bg-blue-900'
          : 'text-gray-700 bg-opacity-0 bg-gray-700 hover:bg-opacity-20'
      }`}
      target={target}
    >
      {children}
    </a>
  </Link>
);
