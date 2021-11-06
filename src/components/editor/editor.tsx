/* eslint-disable consistent-return */
import { Ace } from 'ace-builds';
import React, { useEffect, useState } from 'react';
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
}: {
  className?: string;
  shader?: WorkInfo | undefined | null;
}) => {
  const [glsl, setGLSL] = useState(defaultGLSL);
  const [playingGLSL, setPlayingGLSL] = useState(defaultGLSL);
  const [name, setName] = useState('Title');
  const [tag, setTag] = useState(['tags']);
  const [errors, setErrors] = useState<Ace.Annotation[]>([]);

  useEffect(() => {
    setGLSL(shader ? shader.detail.shader : defaultGLSL);
    setName(shader ? shader.detail.title : 'Title');
    setTag(shader ? shader.detail.tags : ['tags']);
    setPlayingGLSL(shader ? shader.detail.shader : defaultGLSL);
  }, [shader]);

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
            saveShader={() => 'a'}
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
