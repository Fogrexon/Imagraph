/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Ace } from 'ace-builds';
import { DefaultInput, Filter, Renderer } from 'graphim';
import React, { createRef, useEffect, useRef } from 'react';
import { Alert } from '../ui/alert';
import hatoImg from '../ui/hato.jpg';
import { initialize, refreshShader } from './initialize';



// eslint-disable-next-line no-shadow
export const Viewer = ({
  glsl,
  updateErrors,
  errors,
}: {
  glsl: string;
  updateErrors: (newErrors: Ace.Annotation[]) => void;
  errors: Ace.Annotation[];
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
        updateErrors
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
          updateErrors
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
    if (filterRef.current) refreshShader(filterRef, glslRef, updateErrors);
  }, [glsl]);

  return (
    <div className="relative flex justify-center w-full">
      <img ref={imgRef} alt="preview" className="w-11/12 shadow rounded-md" src={hatoImg.src} />
      <div
        className={`absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center transition-opacity duration-500 bg-gray-700 bg-opacity-70 ${
          errors.length === 0 ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-11/12">
          {errors.map((error) => (
            <Alert type="alert" key={error.text}>{`Line: ${error.row} : ${error.text}`}</Alert>
          ))}
        </div>
      </div>
    </div>
  );
};
