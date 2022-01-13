import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  limit,
  getDoc,
  getFirestore,
  DocumentReference,
  serverTimestamp,
} from 'firebase/firestore';
import { firebaseApp } from './firebase';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = collection(getFirestore(firebaseApp), 'user');
// const latestWork = orderBy('updatedAt', 'desc');

// const initializer = (userid: string) => {
//   workCollection = getDocs();
// }

// works
const snapshotToList = (list: any, userid: string) => {
  const items: WorkInfo[] = [];
  list.forEach((item: any) => {
    const d = item.data();
    items.push({
      id: item.id,
      detail: {
        title: d.title,
        shaders: d.shaders,
        tags: d.tags,
        tree: d.tree,
        userid,
        createdAt: (new Date(d.createdAt.seconds*1000)).toISOString(),
      },
    });
  });
  return items;
};

export const getWorkCollection = (userid: string) =>
  collection(doc(userCollection, userid), 'work');

export const getWorkList = async (userid: string, maxWorkCount?: number) => {
  const workDatabase = await (maxWorkCount
    ? getDocs(query(getWorkCollection(userid), limit(maxWorkCount)))
    : getDocs(getWorkCollection(userid)));
  return snapshotToList(workDatabase, userid);
};

export const updateWork = (userid: string, id: string, workDetail: WorkDetail) =>
  setDoc(doc(getWorkCollection(userid), id), workDetail);

export const addWork = (userid: string, workDetail: WorkDetail) =>
  addDoc(getWorkCollection(userid), {...workDetail, createdAt: serverTimestamp()});

export const getWorkID = async (docRef: DocumentReference) => (await getDoc(docRef)).id;

export const setUser = (userid: string, user: User) =>
  setDoc(doc(userCollection, userid), {
    id: user.id,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });

export const hasUser = async (userid: string) => {
  const userSnap = await getDoc(doc(userCollection, userid));
  return userSnap.exists();
};

export const getUser = async (userid: string): Promise<User | undefined> =>
  (await getDoc(doc(userCollection, userid))).data() as User;
