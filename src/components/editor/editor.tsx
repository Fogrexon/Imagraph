/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { Ace } from './ace';
import { ControlBar } from './control-bar';
import { Viewer } from './viewer';

const defaultGLSL = `
void main() {
  vec4 col = texture2D(renderTexture, vUv);
  gl_FragColor = col;
}
`;

export const Editor = ({ className = "" }: { className?: string }) => {
  const [glsl, setGLSL] = useState(defaultGLSL);
  const [playingGLSL, setPlayingGLSL] = useState(glsl);
  const [name, setName] = useState('aaaaa');
  const [tag, setTag] = useState(['aaaaa']);

  return (
    <main className={`${className} flex flex-col w-full`}>
      <ControlBar
        playShader={() => setPlayingGLSL(glsl)}
        saveShader={() => 'a'}
        name={name}
        updateName={setName}
        tags={tag}
        updateTags={setTag}
      />
      <div className="w-full flex flex-grow flex-col-reverse md:flex-row">
        <Ace glsl={glsl} setGLSL={setGLSL} />
        <Viewer glsl={playingGLSL} />
      </div>
    </main>
  );
}
