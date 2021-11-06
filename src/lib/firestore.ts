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
} from 'firebase/firestore';
import { firestore } from './firebase';

const userCollection = collection(firestore, 'user');
const workCollection = collection(firestore, 'gallery');
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
        shader: d.shader,
        tags: [],
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
