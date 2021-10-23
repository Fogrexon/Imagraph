import React from 'react';
import { WorkInfo } from '../../libs/firestore';

export const Card = ({item}: {item: WorkInfo}) => (
  <div className="w-40 md:w-64 h-32">
    {item.detail.title}
  </div>
);
