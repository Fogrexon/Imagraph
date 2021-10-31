/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Ace } from 'ace-builds';
import { Filter, Renderer } from 'graphim';
import React, { createRef, useEffect, useRef, useState } from 'react';
import { Alert } from '../ui/alert';
import hatoSrc from '../ui/hato.jpg';

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
  const filter = useRef<Filter>();

  const createFilter = () => {
    let renderer: Renderer;
    const initialize = (img: HTMLImageElement) => () => {
      renderer = new Renderer({ image: img });
      // shader compile error
      try {
        filter.current = new Filter(glsl);
        updateErrors([]);
      } catch (e) {
        const errorMes: Ace.Annotation[] = `${e}`
          .split('ERROR: ')
          .slice(1)
          .map((mes) => {
            const splited = mes.split(':');
            const row = Number(splited[1]) - 4;
            const error = splited.slice(2).join(':');

            return { row, column: 0, text: error, type: 'error' };
          });
        updateErrors(errorMes);
      }
      renderer.animate([filter.current as Filter]);
    };

    if (imgRef.current?.complete) {
      initialize(imgRef.current)();
    } else {
      imgRef?.current?.addEventListener('load', initialize(imgRef.current));
    }

    return () => {
      renderer?.stopAnimate();
      renderer?.release();
    };
  };

  const refreshShader = () => {
    try {
      filter.current?.setShader(glsl);
      updateErrors([]);
    } catch (e) {
      const errorMes: Ace.Annotation[] = `${e}`
        .split('ERROR: ')
        .slice(1)
        .map((mes) => {
          const splited = mes.split(':');
          const row = Number(splited[1]) - 4;
          const error = splited.slice(2).join(':');

          return { row, column: 0, text: error, type: 'error' };
        });
      updateErrors(errorMes);
    }
  };

  useEffect(() => {
    if (!imgRef || !imgRef.current) return;
    return createFilter();
  }, []);

  useEffect(() => {
    refreshShader();
  }, [glsl]);

  return (
    <div className="relative flex justify-center w-full">
      <img ref={imgRef} alt="preview" className="w-11/12 shadow rounded-md" src={hatoSrc} />
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
