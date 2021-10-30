import React from 'react';

import iconImg from './icon.jpg';

export const Actor = ({ src = iconImg }: { src?: string }) => (
  <a href="/gallery">
    <span className="w-8 h-8 block overflow-hidden flex-grow-1 delay-300 hover:outline-black" style={{borderRadius: '100px'}}>
      <img src={src} alt="user" className="w-full h-full m-0 p-0"/>
    </span>
  </a>
);
