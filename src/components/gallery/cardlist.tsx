import React from 'react';
import { WorkInfo } from '../../lib/types';
import { ButtonLink } from '../ui/button';
import { Card } from '../ui/card';

const Message = () => (
  <section className="text-center">
    <p>Oops! You haven&apos;t write any shaders.</p>
    <ButtonLink href="/edit/new" primary>
      Write new shader
    </ButtonLink>
  </section>
);

export const CardList = ({ items }: { items: WorkInfo[] }) => (
  <section className="w-screen">
    <div className="container mx-auto">
      <h1 className="text-2xl w-full text-center my-12">Your Codes</h1>
      {items.length === 0 ? (
        <Message />
      ) : (
        <div className="w-full grid grid-cols-3 justify-center">
          {items.map((item: WorkInfo) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  </section>
);
