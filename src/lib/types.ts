export interface User {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  getIdToken: () => Promise<string | null | undefined>;
}

// data schema
// export type UniformType = 'Float' | 'Int' | 'Vector2' | 'Vector3' | 'Vector4' | 'Color'

// export interface UniformVariable {
//   name: string;
//   type: UniformType
// }

// export interface ShaderDetail {

// }

export interface WorkDetail {
  title: string;
  shader: string;
  tags: string[];
  userid: string;
}
export interface WorkInfo {
  id: string;
  detail: WorkDetail;
}
