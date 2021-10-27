/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { AiFillPlayCircle, AiOutlineSave } from 'react-icons/ai';

const Tag = ({children}: {children: string}) => (
    <span className="px-2 py-1 m-1 rounded-md border-2 border-gray-700 hover:bg-gray-700 text-black hover:text-white cursor-pointer">
      {children}
    </span>
  )

export const ControlBar = ({
  playShader,
  saveShader,
  updateName,
  name,
  updateTags,
  tags,
}: {
  playShader: () => void,
  saveShader: (shaderName: string, shaderTag: string[]) => void,
  updateName: (name: string) => void,
  name: string,
  updateTags: (tag: string[]) => void,
  tags: string[],
}) => {
  const [editTag, setEditTag] = useState<string>(tags.join(','));
  const [tagEditFlag, setTagEditFlag] = useState<boolean>(false);
  const leaveHandler = (tag: string) => {
    const listTag = tag.split(',');
    updateTags(listTag);
    setTagEditFlag(false);
  }
  return (
    <div className="w-full">
      <div className="w-full h-14 px-4 py-2 flex flex-row items-center">
        <AiFillPlayCircle className="text-3xl m-1 flex-grow-1" />
        <AiOutlineSave className="text-3xl m-1 flex-grow-1" />
        <input className="text-xl block flex-grow-0" value={name} onChange={(e) => updateName(e.target.value)} />
      </div>
      <div className="w-full h-14 px-4 py-2 flex flex-row items-center" onClick={() => setTagEditFlag(true)}>
        { /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }
        <div className="flex-grow-0">Tags:</div>
          {
            tagEditFlag ?
              (<input className="block flex-grow-0 mx-2" value={editTag} onChange={(e) => setEditTag(e.target.value)} onBlur={e => leaveHandler(e.target.value)} />) :
              (<div className="flex-grow-0">{tags.map(tag => <Tag>{tag}</Tag>)}</div>)
          }
      </div>
    </div>
  );
}