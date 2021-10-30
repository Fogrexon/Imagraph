import React from "react";
import { Navbar } from "../components/ui/header";
import { Editor } from '../components/editor/editor';

export const Edit = () => (
  <div className="w-screen h-screen flex flex-col">
    <Navbar className="flex-grow-1"/>
    <Editor className="flex-grow"/>
  </div>
)
