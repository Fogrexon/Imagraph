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
} from 'firebase/firestore';
import { firebaseApp } from './firebase';
import { WorkDetail, WorkInfo } from './types';

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
      },
    });
  });
  return items;
};

export const getWorkCollection = (userid: string) => collection(doc(userCollection, userid), 'work')

export const getWorkList = async (userid: string, maxWorkCount?: number) => {
  const workDatabase = await (maxWorkCount
    ? getDocs(query(getWorkCollection(userid), limit(maxWorkCount)))
    : getDocs(getWorkCollection(userid)));
  return snapshotToList(workDatabase, userid);
};

export const updateWork = (userid: string, id: string, workDetail: WorkDetail) =>
  setDoc(doc(getWorkCollection(userid), id), workDetail);

export const addWork = (userid: string, workDetail: WorkDetail) => addDoc(getWorkCollection(userid), workDetail);

export const getWorkID = async (docRef: DocumentReference) => (await getDoc(docRef)).id;

export const createUser = async (userid: string, name: string) =>
  // eslint-disable-next-line no-return-await
  await setDoc(doc(userCollection, userid), {
    userid,
    name,
  });

export const hasUser = async (userid: string) => {
  const userSnap = await getDoc(doc(userCollection, userid));
  return userSnap.exists();
};

