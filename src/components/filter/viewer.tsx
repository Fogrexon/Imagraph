/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { DefaultInput, Filter, Renderer } from 'graphim';
import React, { createRef, useEffect, useRef } from 'react';
import { initialize, refreshShader } from './initialize';

// eslint-disable-next-line no-shadow
export const Viewer = ({
  glsl,
  imgSrc,
}: {
  glsl: string;
  imgSrc: string;
}) => {
  const imgRef = createRef<HTMLImageElement>();
  const rendererRef = useRef<Renderer>();
  const filterRef = useRef<Filter>();
  const defaultInputRef = useRef<DefaultInput>();
  const glslRef = useRef<string>(glsl);
  const imgInitedRef = useRef<boolean>(false);
  
  const createFilter = () => {
    if(!imgRef.current) {
      return;
    }
    if (imgRef.current.complete) {
      const image = imgRef.current;
      initialize(
        filterRef,
        rendererRef,
        defaultInputRef,
        image as HTMLImageElement,
        glslRef,
      )();
    } else if(imgRef.current) {
      const image = imgRef.current;
      image.addEventListener(
        'load',
        initialize(
          filterRef,
          rendererRef,
          defaultInputRef,
          image,
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
    if(!imgInitedRef.current || !imgRef.current || imgRef.current.width === 0) {
      imgInitedRef.current = true;
      return;
    }
    if (filterRef.current) rendererRef.current?.setImage(imgRef.current as HTMLImageElement)
  }, [imgSrc]);

  return (
    <div className="relative flex justify-center w-full">
      <img ref={imgRef} alt="preview" className="w-11/12 shadow rounded-md" src={imgSrc} />
    </div>
  );
};
