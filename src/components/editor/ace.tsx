import React from 'react';
import ReactAce from 'react-ace';
import 'ace-builds/src-noconflict/mode-glsl';
import 'ace-builds/src-noconflict/theme-twilight';

// eslint-disable-next-line no-unused-vars
export const Ace = ({glsl, setGLSL}: {glsl: string, setGLSL: (shader: string) => void}) => (
  <div className="flex-grow h-full w-full md:w-2/4 lg:w-3/5">
    <ReactAce 
      mode="glsl"
      theme="twilight"
      value={glsl}
      onChange={setGLSL}
      name="ace_editor"
      editorProps={{ $blockScrolling: true }}
      style={{width: '100%', height: '100%'}}
    />
  </div>
);
