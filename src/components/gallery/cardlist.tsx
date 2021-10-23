import React from 'react';
import { WorkInfo } from '../../libs/firestore';
import { Card } from './card';
import items from './temp.json';

export const CardList = () => (
  <section className=" w-screen">
    <div className="container flex flex-wrap justify-center mx-auto">
      {
        (items as WorkInfo[]).map((item:WorkInfo) => (<Card item={item} />))
      }
    </div>
  </section>
);
