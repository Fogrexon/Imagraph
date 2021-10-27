/* eslint-disable consistent-return */
import React, { createRef, useEffect } from 'react';
import { Renderer, Filter } from 'graphim';
import { WorkInfo } from '../../libs/firestore';
import hatoImg from './hato.jpg';
import iconImg from './icon.jpg';

const Actor = () => (
  <a href="/gallery">
    <span className="w-8 h-8 block overflow-hidden flex-grow-1 delay-300 hover:outline-black" style={{borderRadius: '100px'}}>
      <img src={iconImg} alt="user" className="w-full h-full m-0 p-0"/>
    </span>
  </a>
)

const Tag = ({ children }: { children: string }) => (
  <span className="px-2 py-0.5 border-2 text-sm rounded-md transition-all cursor-pointer hover:bg-white hover:text-black">
    { children }
  </span>
);

export const Card = ({item}: {item: WorkInfo}) => {
  const imgRef = createRef<HTMLImageElement>();
  useEffect(() => {
    if(!imgRef || !imgRef.current) return;
    let renderer: Renderer; let filter: Filter;
    const initialize = () => {
      renderer = new Renderer({ image: imgRef.current as HTMLImageElement});
      filter = new Filter(item.detail.shader);
      renderer.animate([ filter ]);
    }

    if (imgRef.current.complete) {
      initialize();
    } else {
      imgRef?.current.addEventListener('load', initialize);
    }

    return (() => {
      renderer?.stopAnimate();
      renderer?.release();
    });
  })
  return (
    <div className="relative w-40 md:w-64 h-32 shadow mx-2 my-2 rounded-md overflow-hidden">
      <img ref={imgRef} className="w-full h-full absolute top-0 left-0" src={hatoImg} alt="shader" style={{objectFit: 'contain'}} />
      <div className="absolute text-white top-0 left-0 w-full h-full flex flex-col items-center bg-gray-700 bg-opacity-70 opacity-0 hover:opacity-100 duration-300">
      <div className="flex flex-row items-center w-full px-2 py-1">
        <Actor />
        <a href="/gallery">
          <h2 className="text-xl mx-4 my-2 flex-grow-0 hover:underline transition-all duration-500">
            {item.detail.title}
          </h2>
        </a>
      </div>
      
      <div>
        {
          item.detail.tags.map(tag => <Tag>{tag}</Tag>)
        }
      </div>
      </div>
    </div>
  );
};
