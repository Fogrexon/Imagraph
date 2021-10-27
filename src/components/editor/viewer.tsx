/* eslint-disable no-unused-vars */
import React from 'react';

const Alert = ({children}: { children: string }) => (
  <div className="w-full bg-yellow-200 shadow px-4 py-2">
    {children}
  </div>
)

export const Viewer = ({glsl}: { glsl: string }) => (
  <div className="w-2/4 md:w-2/5">{glsl}</div>
)