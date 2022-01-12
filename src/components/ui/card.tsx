/* eslint-disable consistent-return */
import React, { createRef, useEffect, useState } from 'react';
import { Renderer, Filter, DefaultInput } from 'graphim';
import hatoImg from './hato.jpg';
import { Actor } from './actor';
import { User, WorkInfo } from '../../lib/types';
import { getUser } from '../../lib/firestore';
import { ButtonLink } from './button';

export const Card = ({ item }: { item: WorkInfo }) => {
  const imgRef = createRef<HTMLImageElement>();
  const [user, setUser] = useState<User | undefined>();
  useEffect(() => {
    // user data
    getUser(item.detail.userid).then((data) => {
      if (!data) return;
      setUser(data);
    });

    // shader init
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
  }, []);
  return (
    <div className="relative w-40 sm:w-64 h-32 shadow mx-2 my-2 rounded-md overflow-hidden">
      <img
        ref={imgRef}
        className="w-full h-full absolute top-0 left-0"
        src={hatoImg.src}
        alt="shader"
        style={{ objectFit: 'contain' }}
      />
      <div className="absolute text-black top-0 left-0 w-full h-full flex flex-col justify-between items-center bg-gray-100 bg-opacity-70 opacity-0 hover:opacity-100 duration-300">
        <div className="flex flex-row items-center w-full px-2 py-1">
          <Actor src={user?.photoURL} />
          <h3 className="text-xl mx-4 my-2 flex-grow-0 transition-all duration-500">{item.detail.title}</h3>
        </div>
        <div className="w-full p-1 flex justify-end">
          <ButtonLink primary href={`/edit/${item.id}`} target="_blank">Edit</ButtonLink>
          <ButtonLink primary href={`/filter/${item.id}`} target="_blank">Filter</ButtonLink>
        </div>
      </div>
    </div>
  );
};
