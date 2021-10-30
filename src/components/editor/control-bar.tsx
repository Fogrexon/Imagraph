/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { AiFillPlayCircle, AiOutlineSave } from 'react-icons/ai';
import { Button } from '../ui/button';
import { Tag } from '../ui/tag';

export const ControlBar = ({
  playShader,
  saveShader,
  updateName,
  name,
  updateTags,
  tags,
}: {
  playShader: () => void,
  saveShader: () => void,
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
    <div className="w-full flex-grow-0">
      <div className="w-full h-12 px-4 py-2 flex flex-row items-center">
        <Button onClick={() => playShader()}>Play</Button>
        <Button onClick={() => saveShader()}>Save</Button>
        <input className="text-xl block flex-grow-0" value={name} onChange={(e) => updateName(e.target.value)} />
      </div>
      <div className="w-full h-12 px-4 py-2 flex flex-row items-center" onClick={() => setTagEditFlag(true)}>
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