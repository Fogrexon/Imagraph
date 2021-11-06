/* eslint-disable consistent-return */
import React, { createRef, useEffect } from 'react';
import { Renderer, Filter, DefaultInput } from 'graphim';
import Link from 'next/link';
import hatoImg from './hato.jpg';
import { Tag } from './tag';
import { Actor } from './actor';
import { WorkInfo } from '../../lib/types';

export const Card = ({ item }: { item: WorkInfo }) => {
  const imgRef = createRef<HTMLImageElement>();
  useEffect(() => {
    if (!imgRef || !imgRef.current) return;
    let renderer: Renderer;
    let filter: Filter;
    let input: DefaultInput;
    const initialize = () => {
      renderer = new Renderer({ image: imgRef.current as HTMLImageElement });
      filter = new Filter(item.detail.shaders.default.shader as string);
      input = new DefaultInput();
      filter.connect(input);
      renderer.animate(filter);
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
        src={hatoImg.src}
        alt="shader"
        style={{ objectFit: 'contain' }}
      />
      <div className="absolute text-white top-0 left-0 w-full h-full flex flex-col items-center bg-gray-700 bg-opacity-70 opacity-0 hover:opacity-100 duration-300">
        <div className="flex flex-row items-center w-full px-2 py-1">
          <Actor />
          <Link href={`/edit/${item.id}`} passHref>
            <a
              href="dummey"
              className="text-xl mx-4 my-2 flex-grow-0 hover:underline transition-all duration-500"
            >
              {item.detail.title}
            </a>
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
