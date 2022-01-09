/* eslint-disable no-param-reassign */
import { Ace } from 'ace-builds';
import { DefaultInput, Filter, Renderer } from 'graphim';
import { MutableRefObject } from 'react';

// shader initialize
export const initialize =
  (
    filterRef: MutableRefObject<Filter | undefined>,
    rendererRef: MutableRefObject<Renderer | undefined>,
    defaultInputRef: MutableRefObject<DefaultInput | undefined>,
    image: HTMLImageElement,
    glslRef: MutableRefObject<string | undefined>,
    updateErrors: (newErrors: Ace.Annotation[]) => void
  ) =>
  () => {
    rendererRef.current = new Renderer({ image });
    // shader compile error
    try {
      filterRef.current = new Filter(glslRef.current as string);
      defaultInputRef.current = new DefaultInput();
      filterRef.current.connect(defaultInputRef.current);
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
    rendererRef.current.animate(filterRef.current as Filter);
  };

export const refreshShader = (
  filterRef: MutableRefObject<Filter | undefined>,
  glslRef: MutableRefObject<string | undefined>,
  updateErrors: (newErrors: Ace.Annotation[]) => void
) => {
  try {
    filterRef.current?.setShader(glslRef.current as string);
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
