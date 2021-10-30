import React from 'react';

export const Tag = (
  {
    children,
    white = true,
  }: {
    children: string
    white?: boolean
  }) => (
  <span className={
    `px-2 py-0.5 border-2 text-sm rounded-md transition-all cursor-pointer text-${white ? 'white' : 'gray-700'} border-${white ? 'white' : 'gray-700'} hover:bg-${white ? 'white' : 'gray-700'} hover:text-${!white ? 'white' : 'gray-700'}`
  }>
    { children }
  </span>
);