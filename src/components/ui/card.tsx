/* eslint-disable consistent-return */
import React, { createRef, useEffect } from 'react';
import { Renderer, Filter } from 'graphim';
import { Link } from 'react-router-dom';
import { WorkInfo } from '../../libs/firestore';
import hatoImg from './hato.jpg';
import { Tag } from './tag';
import { Actor } from './actor';

export const Card = ({ item }: { item: WorkInfo }) => {
  const imgRef = createRef<HTMLImageElement>();
  useEffect(() => {
    if (!imgRef || !imgRef.current) return;
    let renderer: Renderer;
    let filter: Filter;
    const initialize = () => {
      renderer = new Renderer({ image: imgRef.current as HTMLImageElement });
      filter = new Filter(item.detail.shader);
      renderer.animate([filter]);
    };

    if (imgRef.current.complete) {
      initialize();
    } else {
      imgRef?.current.addEventListener('load', initialize);
    }

    return () => {
      renderer?.stopAnimate();
      filter?.release();
      renderer?.release();
    };
  });
  return (
    <div className="relative w-40 md:w-64 h-32 shadow mx-2 my-2 rounded-md overflow-hidden">
      <img
        ref={imgRef}
        className="w-full h-full absolute top-0 left-0"
        src={hatoImg}
        alt="shader"
        style={{ objectFit: 'contain' }}
      />
      <div className="absolute text-white top-0 left-0 w-full h-full flex flex-col items-center bg-gray-700 bg-opacity-70 opacity-0 hover:opacity-100 duration-300">
        <div className="flex flex-row items-center w-full px-2 py-1">
          <Actor />
          <Link to={`/edit/${item.id}`}>
            <h2 className="text-xl mx-4 my-2 flex-grow-0 hover:underline transition-all duration-500">
              {item.detail.title}
            </h2>
          </Link>
        </div>

        <div>
          {item.detail.tags.map((tag) => (
            <Tag key={tag} white>
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
