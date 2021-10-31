import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { ButtonLink } from '../ui/button';

const Title = () => (
  <div className="max-w-lg mx-auto">
    <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Imagraph</h1>
  </div>
);


const CenterContent = () => (
  <div>
    <Title />
    <p className="mx-4 my-10 text-gray-700">
      シェーダーを書いてオリジナルのカメラフィルターを作りましょう。
    </p>
    <div>
      <ButtonLink primary href="/edit?id=new">
        Create New Filter <BiRightArrowAlt className="inline" />
      </ButtonLink>
      <ButtonLink primary href="/gallery">
        Open Gallery <BiRightArrowAlt className="inline" />
      </ButtonLink>
    </div>
    <ButtonLink href="/">Get Started <BiRightArrowAlt className="inline" /></ButtonLink>
  </div>
);

export const Introduction = () => (
  <section className="container px-6 py-16 mx-auto text-center flex items-center justify-center">
    <CenterContent />
  </section>
);
