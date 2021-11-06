import React from 'react';

const sizeKeyList = ['small', 'middle', 'large'];
type SizeKey = typeof sizeKeyList[number];

export const Actor = ({
  src,
  size = 'middle',
}: {
  src?: string | null | undefined;
  size?: SizeKey;
}) => (
  <span
    className={`${{small: 'w-4 h-4', middle: 'w-8 h-8', large: 'w-14 h-14'}[size]} inline-block align-middle overflow-hidden flex-grow-1 delay-300 hover:outline-black`}
    style={{ borderRadius: '100px' }}
  >
    {src ? <img src={src} alt="user" className="w-full h-full m-0 p-0" /> : ''}
  </span>
);
