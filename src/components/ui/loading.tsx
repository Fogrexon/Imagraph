import React, { useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export const Loading = () => {
  const [interval, setIntervalID] = useState<number>(-1);
  const [rot, setRotation] = useState<number>(0);

  useEffect(() => {
    setIntervalID(
      window.setInterval(() => {
        setRotation(rot + 1);
      }, 1000 / 60)
    );

    return () => {
      if (interval >= 0) {
        clearInterval(interval);
        setIntervalID(-1);
      }
    };
  }, []);

  return <AiOutlineLoading3Quarters style={{ transform: `rotate(${rot}deg)` }} />;
};
