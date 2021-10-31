import React from 'react';
import { Link } from 'react-router-dom';

import iconImg from './icon.jpg';

export const Actor = ({ src = iconImg }: { src?: string }) => (
  <Link to="/gallery">
    <span className="w-8 h-8 inline-block align-middle overflow-hidden flex-grow-1 delay-300 hover:outline-black" style={{borderRadius: '100px'}}>
      <img src={src} alt="user" className="w-full h-full m-0 p-0"/>
    </span>
  </Link>
);
