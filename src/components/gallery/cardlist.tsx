import React from 'react';
import { WorkInfo } from '../../libs/firestore';
import { Card } from './card';
import items from './temp.json';

export const CardList = () => (
  <section className="w-screen">
    <div className="container mx-auto">
      <h1 className="text-xl w-full px-4 py-4 mx-2 my-2 border-l-2">Popular</h1>
      <div className="w-full flex flex-wrap justify-center">
        {
          (items as WorkInfo[]).map((item:WorkInfo) => (<Card item={item} />))
        }
      </div>
    </div>
  </section>
);
