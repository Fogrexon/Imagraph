import { addDoc, collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, limit, query, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = collection(firestore, 'user');
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
  workCollection = collection(firestore, 'user', userid, 'work');
  userdoc = await getDoc(doc(userCollection, userid));
}


const getWorkList = async (maxWorkCount?: number) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  const q = maxWorkCount ? query(workCollection, limit(maxWorkCount)) : workCollection;
  const workData = await getDocs(q);
  return snapshotToList(workData);
};

const getWork = (id: string) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  return getDoc(doc(workCollection, id));
}

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

const getUser = async (): Promise<User | null> => userdoc?.data() as User;

const existUser = (userid: string) => getDoc(doc(userCollection, userid));

const createUser = async (userid: string, name: string, photoURL: string) => {
  if (await existUser(userid)) return;
  setDoc(doc(userCollection, userid), {
    id: userid,
    displayName: name,
    photoURL,
  });
}


export { getWorkList, getWork, updateWork, addWork, createUser, getUser };
