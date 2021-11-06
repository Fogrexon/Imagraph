/* eslint-disable consistent-return */
import { Ace } from 'ace-builds';
import React, { useState } from 'react';
import { WorkInfo } from '../../lib/types';
import { AceEditor } from './ace';
import { ControlBar } from './control-bar';
import { Viewer } from './viewer';

const defaultGLSL = `
void main() {
  vec4 col = texture2D(renderTexture, vUv);
  gl_FragColor = col;
}
`;

export const Editor = ({
  className = '',
  shader,
  shaderID,
}: {
  className?: string;
  shader?: WorkInfo | undefined | null;
  shaderID?: string
}) => {
  const [glsl, setGLSL] = useState(shader && shaderID ? shader.detail.shaders[shaderID].shader as string : defaultGLSL);
  const [playingGLSL, setPlayingGLSL] = useState(glsl);
  const [name, setName] = useState(shader && shaderID ? shader.detail.title : 'Title');
  const [tag, setTag] = useState(shader && shaderID ? shader.detail.tags : ['tags']);
  const [errors, setErrors] = useState<Ace.Annotation[]>([]);

  const saveShader = () => {
    if (errors.length !== 0) window?.alert('cannot save. Resolve all errors');
    
    
  }

  return (
    <main className={`${className} flex flex-col w-full`}>
      <div className="w-full flex flex-grow flex-col-reverse md:flex-row">
        <AceEditor glsl={glsl} setGLSL={setGLSL} errors={errors} />
        <div className="relative flex-grow-1 flex justify-center items-center flex-col py-4 md:h-full w-full md:w-2/4 lg:w-2/5">
          <Viewer glsl={playingGLSL} updateErrors={setErrors} errors={errors} />
          <ControlBar
            playShader={() => {
              setPlayingGLSL(glsl);
            }}
            saveShader={saveShader}
            name={name}
            updateName={setName}
            tags={tag}
            updateTags={setTag}
          />
        </div>
      </div>
    </main>
  );
};
