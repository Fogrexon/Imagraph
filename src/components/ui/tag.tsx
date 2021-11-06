import React from 'react';

export const Tag = ({ children, white = false }: { children: string; white?: boolean }) => (
  <span
    className={`px-2 py-0.5 mx-1 my-1 text-sm rounded-md transition-all cursor-pointer ${
      white ? 'text-white' : 'text-gray-700'
    } ${white ? 'bg-gray-700' : 'bg-gray-200'} ${white ? 'hover:bg-white' : 'hover:bg-gray-700'} ${
      !white ? 'hover:text-white' : 'hover:text-gray-700'
    }`}
  >
    {children}
  </span>
);
