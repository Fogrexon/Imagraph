import React, { ReactNode, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';

export const Button = (
  {
    children,
    onClick,
    small = false,
    primary = false,
  }: {
    children: ReactNode,
    // eslint-disable-next-line no-unused-vars
    onClick: MouseEventHandler<HTMLButtonElement>,
    small?: boolean,
    primary?: boolean,
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`inline-block mx-2 my-2${ small ? ' px-2 py-1 text-sm font-medium rounded-md' : ' px-4 py-2 rounded-xl'} transition-colors duration-1 ${
        primary
          ? 'bg-blue-700 text-white hover:bg-blue-900'
          : 'text-gray-700 bg-opacity-0 bg-gray-200 hover:bg-opacity-100'
      }`}
    >
      {children}
    </button>
  );


export const ButtonLink = (
{
  primary = false,
  small = false,
  href,
  children,
}: {
  primary?: boolean;
  small?: boolean;
  href: string;
  children: ReactNode;
}) => (
  <Link
    to={href}
    className={`inline-block mx-2 my-2${ small ? ' px-2 py-1 text-sm font-medium rounded-md' : ' px-4 py-2 rounded-xl'} transition-colors duration-1 ${
      primary
        ? 'bg-blue-700 text-white hover:bg-blue-900'
        : 'text-gray-700 bg-opacity-0 bg-gray-200 hover:bg-opacity-100'
    }`}
  >
    {children}
  </Link>
);