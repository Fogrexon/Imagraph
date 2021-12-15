import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  limit,
  where,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { firebaseApp } from './firebase';
import { WorkDetail, WorkInfo } from './types';

const userCollection = collection(getFirestore(firebaseApp), 'user');
const workCollection = collection(getFirestore(firebaseApp), 'gallery');
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
const getWorkList = async (userid: string, maxWorkCount?: number) => {
  const workDatabase = await (maxWorkCount
    ? getDocs(query(workCollection, where('userid', '==', userid), limit(maxWorkCount)))
    : getDocs(query(workCollection, where('userid', '==', userid))));
  return snapshotToList(workDatabase, userid);
};

const updateWork = (id: string, workDetail: WorkDetail) =>
  setDoc(doc(workCollection, id), workDetail);

const addWork = (workDetail: WorkDetail) => addDoc(workCollection, workDetail);

const createUser = async (userid: string, name: string) =>
  // eslint-disable-next-line no-return-await
  await setDoc(doc(userCollection, userid), {
    userid,
    name,
  });

const hasUser = async (userid: string) => {
  const userSnap = await getDoc(doc(userCollection, userid));
  return userSnap.exists();
};

export { getWorkList, updateWork, addWork, createUser, hasUser };
