import React from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';

const Title = () => (
  <div className="max-w-lg mx-auto">
    <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">Imagraph</h1>
  </div>
);

const Button = ({
  isButton = false,
  href,
  children,
}: {
  isButton?: boolean;
  href: string;
  children: string;
}) => (
  <a
    href={href}
    className={`inline-block mx-2 my-2 px-4 py-2 transition-colors duration-1 ${
      isButton
        ? 'bg-blue-700 text-white hover:bg-blue-900'
        : 'text-gray-700 bg-white hover:bg-gray-200'
    } rounded-xl`}
  >
    {children} <BiRightArrowAlt className="inline" />
  </a>
);

const CenterContent = () => (
  <div>
    <Title />
    <p className="mx-4 my-10 text-gray-700">
      シェーダーを書いてオリジナルのカメラフィルターを作りましょう。
    </p>
    <div>
      <Button isButton href="/edit?id=new">
        Create New Filter
      </Button>
      <Button isButton href="/gallery">
        Open Gallery
      </Button>
    </div>
    <Button href="/">Get Started</Button>
  </div>
);

export const Introduction = () => (
  <section className="container px-6 py-16 mx-auto text-center flex items-center justify-center">
    <CenterContent />
  </section>
);
