import { addDoc, collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, getFirestore, limit, query, setDoc } from 'firebase/firestore';
import { firebaseApp } from './firebase';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = collection(getFirestore(firebaseApp), 'user');
let workCollection: typeof userCollection | null = null;
let userdoc: DocumentSnapshot<DocumentData> | null = null;

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

export const initializeWorkCollection = async (userid: string) => {
  workCollection = collection(getFirestore(firebaseApp), 'user', userid, 'work');
  userdoc = await getDoc(doc(userCollection, userid));
}


export const getWorkList = async (maxWorkCount?: number) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  const q = maxWorkCount ? query(workCollection, limit(maxWorkCount)) : workCollection;
  const workData = await getDocs(q);
  return snapshotToList(workData);
};

export const getWork = (id: string) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  return getDoc(doc(workCollection, id));
}

export const updateWork = (id: string, workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  return setDoc(doc(workCollection, id), workDetail);
}

export const addWork = (workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  addDoc(workCollection, workDetail);
}

export const getUser = async (): Promise<User | null> => userdoc?.data() as User;

export const existUser = (userid: string) => getDoc(doc(userCollection, userid));

export const createUser = (userid: string, name: string, photoURL: string) => setDoc(doc(userCollection, userid), {
    id: userid,
    displayName: name,
    photoURL,
  });
