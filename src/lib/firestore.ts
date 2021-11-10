import { firestore } from './firebase';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = firestore.collection('user');
let workCollection: typeof userCollection | null = null;

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
  workCollection = userCollection.doc(userid).collection('gallery');
}
const getWorkList = async (maxWorkCount?: number) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  const workDatabase = await (maxWorkCount
    ? workCollection.limit(maxWorkCount).get()
    : workCollection.get());
  return snapshotToList(workDatabase);
};

const updateWork = (id: string, workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  return workCollection.doc(id).set(workDetail);
}

const addWork = (workDetail: WorkDetail) => {
  if (!workCollection) {
    console.warn('firestore workcollection is not initialized.');
    return;
  }
  workCollection.add(workDetail);
}

const getUser = async (userid: string): Promise<User | null> => {
  const userSnap = await userCollection.doc(userid).get();
  if (!userSnap.exists) return null;
  return userSnap.data() as User;
};

const createUser = async (userid: string, name: string, photoURL: string) => {
  if (await getUser(userid)) return;
  userCollection.doc(userid).set({
    id: userid,
    displayName: name,
    photoURL,
  });
}


export { getWorkList, updateWork, addWork, createUser, getUser };
