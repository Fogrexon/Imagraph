/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { User, WorkInfo } from '../../lib/types';
import { Viewer } from './viewer';
import hatoImg from '../ui/hato.jpg';
import { Actor } from '../ui/actor';
import { getUser } from '../../lib/firestore';
import { ControlBar } from './controlbar';

export const Filter = ({ item }: { item: WorkInfo }) => {
  const [imgSrc, setImgSrc] = useState<string>(hatoImg.src);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(item.detail.userid).then(itemUser => setUser(itemUser))
  }, [item])

  // image d&d
  const fileReader = (file: Blob) => {
    if (!file) return ;
    const reader = new FileReader();
    reader.addEventListener('load', (e2) => setImgSrc(e2?.target?.result as string));
    reader.readAsDataURL(file);
  }
  const onDrop = useCallback(files => {
    fileReader(files[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png'});

  return (
    <section
      className="w-full overflow-x-hidden p-4"
      >
      <div className="container mx-auto">
        <Viewer glsl={item.detail.shaders.default.shader || ''} imgSrc={imgSrc} />
        <p
          {...getRootProps()}
          className={`w-full text-center my-6 px-6 py-8 bg-gray-200 ring-gray-400 cursor-pointer ${isDragActive ? 'ring-4' : 'ring-2'}`}
        >
          画像をドラッグアンドドロップまたはここをクリックして差し替え
          <input type="file"{...getInputProps()} />
        </p>
        <h1 className="text-2xl w-full my-6 px-2">Filter - {item.detail.title}</h1>
        <p className="w-full my-2">
          <Actor src={user?.photoURL} />
          <span className="mx-2">{user?.displayName}</span>
        </p>
        <ControlBar item={item} />
      </div>
    </section>
  );
}
