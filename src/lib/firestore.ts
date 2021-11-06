import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  query,
  limit,
  getDoc,
  CollectionReference,
} from 'firebase/firestore';
import { firestore } from './firebase';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = collection(firestore, 'user');
let workCollection: CollectionReference | null = null;
// const latestWork = orderBy('updatedAt', 'desc');

// const initializer = (userid: string) => {
//   workCollection = getDocs();
// }

// works
const snapshotToList = (list: any) => {
  const items: WorkInfo[] = [];
  list.forEach((item: any) => {
    const d = item.data();
    items.push({
      id: item.id,
      detail: {
        userRef: d.userRef,
        title: d.title,
        shaders: d.shaders,
        tree: d.tree,
        tags: d.tags,
      },
    });
  });
  return items;
};

export const initializeWorkCollection = (userid: string) => {
  workCollection = collection(firestore, 'user', userid, 'gallery');
}
const getWorkList = async (maxWorkCount?: number) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  const workDatabase = await (maxWorkCount
    ? getDocs(query(workCollection, limit(maxWorkCount)))
    : getDocs(query(workCollection)));
  return snapshotToList(workDatabase);
};

const updateWork = (id: string, workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  return setDoc(doc(workCollection, id), workDetail);
}

const addWork = (workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  addDoc(workCollection, workDetail);
}

const getUser = async (userid: string): Promise<User | null> => {
  const userSnap = await getDoc(doc(userCollection, userid));
  if (!userSnap.exists()) return null;
  return userSnap.data() as User;
};

const createUser = async (userid: string, name: string, photoURL: string) => {
  if (await getUser(userid)) return;
  setDoc(doc(userCollection, userid), {
    displayName: name,
    photoURL,
  });
}


export { getWorkList, updateWork, addWork, createUser, getUser };
