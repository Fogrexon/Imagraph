import React, { ReactNode, MouseEventHandler } from 'react';

export const Button = (
  {
    children,
    onClick,
  }: {
    children: ReactNode,
    // eslint-disable-next-line no-unused-vars
    onClick: MouseEventHandler<HTMLButtonElement>,
  }) => (
  <button type="button" className="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-1 rounded-md md:mt-0 hover:bg-gray-300" onClick={onClick}>
    { children }
  </button>
  );
