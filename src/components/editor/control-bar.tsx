/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AiFillPlayCircle, AiFillSave } from 'react-icons/ai';
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
  playShader: () => void;
  saveShader: () => void;
  updateName: (name: string) => void;
  name: string;
  updateTags: (tag: string[]) => void;
  tags: string[];
}) => {
  const [editTag, setEditTag] = useState<string>(tags.join(','));
  const [tagEditFlag, setTagEditFlag] = useState<boolean>(false);
  const leaveHandler = (tag: string) => {
    const listTag = tag.split(',');
    updateTags(listTag);
    setTagEditFlag(false);
  };
  return (
    <div className="w-11/12 shadow rounded-md flex-grow-0 my-4 p-2">
      <div className="w-full h-12 px-4 py-2 flex flex-row items-center">
        <div className="flex-grow w-48">
          <Button small onClick={() => playShader()}>
            <AiFillPlayCircle className="text-2xl" />
          </Button>
          <Button small onClick={() => saveShader()}>
            <AiFillSave className="text-2xl" />
          </Button>
        </div>
        <input
          className="text-xl block flex-grow-0 w-full"
          value={name}
          onChange={(e) => updateName(e.target.value)}
        />
      </div>
      <div
        className="w-full h-12 px-4 py-2 flex flex-row items-center"
        onClick={() => setTagEditFlag(true)}
      >
        <div className="flex-grow">Tags:</div>
        {tagEditFlag ? (
          <input
            className="block flex-grow-0 mx-2 w-full"
            value={editTag}
            onChange={(e) => setEditTag(e.target.value)}
            onBlur={(e) => leaveHandler(e.target.value)}
          />
        ) : (
          <div className="flex-grow-0 w-full">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
