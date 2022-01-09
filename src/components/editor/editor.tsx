/* eslint-disable consistent-return */
import { Ace } from 'ace-builds';
import { useRouter } from 'next/dist/client/router';
import React, { useContext, useState } from 'react';
import { addWork, getWorkID, updateWork } from '../../lib/firestore';
import { WorkDetail, WorkInfo } from '../../lib/types';
import { AuthContext } from '../common/auth';
import { NotificationContext } from '../common/notification';
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
  shader?: WorkInfo;
  shaderID?: string;
}) => {
  const { user } = useContext(AuthContext);
  const { dispatchNotification } = useContext(NotificationContext);
  const [glsl, setGLSL] = useState(
    shader && shaderID ? (shader.detail.shaders[shaderID].shader as string) : defaultGLSL
  );
  const [playingGLSL, setPlayingGLSL] = useState(glsl);
  const [name, setName] = useState(shader && shaderID ? shader.detail.title : 'Title');
  const [tag, setTag] = useState(shader && shaderID ? shader.detail.tags : ['tags']);
  const [errors, setErrors] = useState<Ace.Annotation[]>([]);

  const router = useRouter();

  const saveShader = () => {
    if (!user) return;
    const newWorkDetail: WorkDetail = {
      title: name,
      shaders: {
        default: {
          name: 'default',
          shader: playingGLSL,
        },
        input: {
          name: 'default-input',
        },
      },
      tree: {
        type: 'Filter',
        id: 'default',
        input: [
          {
            type: 'Input',
            id: 'input',
          },
        ],
      },
      tags: tag,
      userid: user.id,
    };

    if (router.query.id !== 'new')
      updateWork(user.id, router.query.id as string, newWorkDetail)
        .then(() => dispatchNotification({ type: 'info', message: '保存しました' }))
        .catch(() => {
          dispatchNotification({ type: 'error', message: '保存に失敗しました' });
        });
    else
      addWork(user.id, newWorkDetail)
        .then((doc) => getWorkID(doc))
        .then((docid) =>
          dispatchNotification({ type: 'info', message: '新規登録しました' }).then(() => docid)
        )
        .then((docid) => {
          router.push(`/edit/${docid}`);
        })
        .catch(() => {
          dispatchNotification({ type: 'error', message: '新規登録に失敗しました' });
        });
  };

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
