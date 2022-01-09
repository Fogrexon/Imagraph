/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { DefaultInput, Filter, Renderer } from 'graphim';
import React, { createRef, useEffect, useRef } from 'react';
import { initialize, refreshShader } from './initialize';
import hatoImg from '../ui/hato.jpg';

// eslint-disable-next-line no-shadow
export const Viewer = ({
  glsl,
  imgSrc = hatoImg.src,
}: {
  glsl: string;
  imgSrc: string | null | undefined;
}) => {
  const imgRef = createRef<HTMLImageElement>();
  const rendererRef = useRef<Renderer>();
  const filterRef = useRef<Filter>();
  const defaultInputRef = useRef<DefaultInput>();
  const glslRef = useRef<string>(glsl);

  const createFilter = () => {
    if (imgRef.current?.complete) {
      initialize(
        filterRef,
        rendererRef,
        defaultInputRef,
        imgRef.current as HTMLImageElement,
        glslRef,
      )();
    } else {
      imgRef?.current?.addEventListener(
        'load',
        initialize(
          filterRef,
          rendererRef,
          defaultInputRef,
          imgRef.current as HTMLImageElement,
          glslRef,
        )
      );
    }

    return () => {
      rendererRef.current?.stopAnimate();
      rendererRef.current?.release();
      filterRef.current?.release();
      defaultInputRef.current?.release();
    };
  };

  useEffect(() => {
    if (!imgRef || !imgRef.current) return;
    return createFilter();
  }, []);

  useEffect(() => {
    glslRef.current = glsl;
    if (filterRef.current) refreshShader(filterRef, glslRef);
  }, [glsl]);

  useEffect(() => {
    if (filterRef.current) rendererRef.current?.setImage(imgRef.current as HTMLImageElement)
  }, [imgSrc]);

  return (
    <div className="relative flex justify-center w-full">
      <img ref={imgRef} alt="preview" className="w-11/12 shadow rounded-md" src={imgSrc || hatoImg.src} />
    </div>
  );
};
