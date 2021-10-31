import React from 'react';

const sizeKeyList = ["small", "middle", "large"]
type SizeKey = typeof sizeKeyList[number];
const sizeClass: {[key: SizeKey]: string} = {
  small: 'w-4 h-4',
  middle: 'w-8 h-8',
  large: 'w-14 w-14',
}

export const Actor = ({ src, size='middle' }: { src?: string | null | undefined, size?: string }) => (
  <span
    className={`${sizeClass[size]} inline-block align-middle overflow-hidden flex-grow-1 delay-300 hover:outline-black`}
    style={{ borderRadius: '100px' }}
  >
    { src ? <img src={src} alt="user" className="w-full h-full m-0 p-0" /> : '' }
  </span>
);
