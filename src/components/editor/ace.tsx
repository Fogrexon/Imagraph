import React from 'react';
import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/mode-glsl';
import 'ace-builds/src-noconflict/theme-twilight';
import { Ace } from 'ace-builds';

// eslint-disable-next-line no-unused-vars
export const AceEditor = ({
  glsl,
  setGLSL,
  errors,
}: {
  glsl: string;
  // eslint-disable-next-line no-unused-vars
  setGLSL: (shader: string) => void;
  errors: Ace.Annotation[];
}) => (
  <div className="relative flex justify-center items-center flex-grow h-96 md:h-full w-full md:w-2/4 lg:w-3/5">
    <ReactAce
      mode="glsl"
      theme="twilight"
      value={glsl}
      onChange={setGLSL}
      name="ace_editor"
      editorProps={{ $blockScrolling: true }}
      style={{ width: '91.666667%', height: '91.666667%' }}
      className="shadow rounded-md"
      annotations={errors}
    />
  </div>
);
