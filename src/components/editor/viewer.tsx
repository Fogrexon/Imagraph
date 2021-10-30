/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { Filter, Renderer } from 'graphim';
import React, { createRef, useEffect, useRef, useState } from 'react';
import hatoSrc from '../ui/hato.jpg';

const Alert = ({children}: { children: string }) => (
  <div className="w-full bg-yellow-200 shadow px-4 py-2">
    {children}
  </div>
)

export const Viewer = ({glsl}: { glsl: string }) => {
  const [errorMessage, setErrorMessage] = useState<any[]>([]);
  const imgRef = createRef<HTMLImageElement>();
  const filter = useRef<Filter>();

  const createFilter = () => {
    let renderer: Renderer;
    const initialize = () => {
      renderer = new Renderer({ image: imgRef.current as HTMLImageElement });
      // shader compile error
      try {
        filter.current = new Filter(glsl);
        setErrorMessage([]);
      } catch(e) {
        const errors = `${e  }`.split('ERROR: ').slice(1).map(mes => {
          const splited = mes.split(':');
          const line = Number(splited[1]) - 3;
          const error = splited.slice(2).join(':');
  
          return (<Alert key={mes}>{`Line: ${line} : ${error}`}</Alert>)
        });
        setErrorMessage(errors);
      }
      renderer.animate([ filter.current as Filter ]);
    }
  
    if(imgRef.current?.complete) {
      initialize();
    } else {
      imgRef?.current?.addEventListener('load', initialize);
    }
  
    return (() => {
      renderer?.stopAnimate();
      renderer?.release();
    });
  }

  const refreshShader = () => {
    try {
      filter.current?.setShader(glsl);
      setErrorMessage([]);
    } catch(e) {
      const errors = `${e  }`.split('ERROR: ').slice(1).map(mes => {
        const splited = mes.split(':');
        const line = Number(splited[1]) - 3;
        const error = splited.slice(2).join(':');

        return (<Alert key={mes}>{`Line: ${line} : ${error}`}</Alert>)
      });
      setErrorMessage(errors);
    }
  }


  useEffect(() => {
    if (!imgRef || !imgRef.current) return;
    if (!filter.current) return createFilter();
    refreshShader();
  }, [glsl]);

  return (
    <div className="flex-grow-1 md:h-full w-full md:w-2/4 lg:w-2/5">
      <img ref={imgRef} alt="preview" className="w-full" src={hatoSrc} />
      <div>
        {errorMessage}
      </div>
    </div>
  )
}