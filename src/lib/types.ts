import { CollectionReference } from "firebase/firestore";

export interface User {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  getIdToken: () => Promise<string | null | undefined>;
}

// data schema
export type UniformType = 'Float' | 'Matrix4' | 'Vector2' | 'Vector3' | 'Vector4' | 'Color';
export type NodeType = 'Input' | 'Filter' | 'BlendFilter';
export interface UniformVariable {
  name: string;
  type: UniformType
}

export interface ShaderDetail {
  name: string;
  shader: string;
  uniforms: UniformVariable[];
}

export interface ShaderNode {
  type: NodeType;
  id: string;
  input: ShaderNode[];
}

export interface WorkDetail {
  userRef?: CollectionReference;
  title: string;
  shaders: {[key: string]: ShaderDetail};
  tree: ShaderNode;
  tags: string[];
}
export interface WorkInfo {
  id: string;
  detail: WorkDetail;
}
