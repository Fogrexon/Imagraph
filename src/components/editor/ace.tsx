import React from 'react';
import dynamic from 'next/dynamic';
import { Ace } from 'ace-builds';

const ReactAceEdit = dynamic(async () => {
  const ace = await import('react-ace');
  await import("ace-builds/src-noconflict/mode-glsl");
  await import("ace-builds/src-noconflict/theme-twilight");
  return ace;

}, { ssr: false });

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
    <ReactAceEdit
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
