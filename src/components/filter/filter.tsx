import React, { useEffect, useState } from 'react';
import { WorkInfo } from '../../lib/types';
import { Viewer } from './viewer';
import hatoImg from '../ui/hato.jpg';

export const Filter = ({ item }: { item: WorkInfo }) => {
  const [imgSrc, setImgSrc] = useState<string>(hatoImg.src);
  

  useEffect(() => {
    // on other place clicked, close panel
    const dropHandler = (e: DragEvent) => {
      e.preventDefault();
      if(!e.dataTransfer) return;
      const file = e.dataTransfer.files[0];
      
      const reader = new FileReader();
      reader.addEventListener('load', (e2) => setImgSrc(e2?.target?.result as string));
      reader.readAsDataURL(file);
    };
    const dragHandler = (e: DragEvent) => e.preventDefault();
    document.addEventListener('dragover', dragHandler);
    document.addEventListener('drop', dropHandler);
    return () => {
      document.removeEventListener('dragover', dragHandler);
      document.removeEventListener('drop', dropHandler);
    };
  }, []);
  return (
    <section className="w-screen">
      <div className="container mx-auto">
        <h1 className="text-2xl w-full text-center my-12">Filter - {item.detail.title}</h1>
        <Viewer glsl={item.detail.shaders.default.shader || ''} imgSrc={imgSrc} />
      </div>
    </section>
  );
}
