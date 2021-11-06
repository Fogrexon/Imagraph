export interface User {
  displayName: string | null | undefined;
  email: string | null | undefined;
  photoURL: string | null | undefined;
  getIdToken: () => Promise<string | null | undefined>;
}
