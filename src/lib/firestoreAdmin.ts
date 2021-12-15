import { firestore } from './firebaseAdmin';
import { User, WorkDetail, WorkInfo } from './types';

const userCollection = firestore.collection('user');

// works
const snapshotToList = (list: any, userid: string) => {
  const items: WorkInfo[] = [];
  list.forEach((item: any) => {
    const d = item.data();
    items.push({
      id: item.id,
      detail: {
        userid,
        title: d.title,
        shaders: d.shaders,
        tree: d.tree,
        tags: d.tags,
      },
    });
  });
  return items;
};

export const getWorkCollection = (userid: string) => userCollection.doc(userid).collection('work');

export const getWorkList = async (userid: string, maxWorkCount?: number) => {
  const workDatabase = await (maxWorkCount
    ? getWorkCollection(userid).limit(maxWorkCount).get()
    : getWorkCollection(userid).get());
  return snapshotToList(workDatabase, userid);
};

export const updateWork = (userid: string, id: string, workDetail: WorkDetail) =>
  getWorkCollection(userid).doc(id).set(workDetail);

export const addWork = (userid: string, workDetail: WorkDetail) =>
  getWorkCollection(userid).add(workDetail);

export const getUser = async (userid: string): Promise<User | null> => {
  const userSnap = await userCollection.doc(userid).get();
  if (!userSnap.exists) return null;
  return userSnap.data() as User;
};

export const createUser = async (userid: string, name: string, photoURL: string) => {
  if (await getUser(userid)) return;
  userCollection.doc(userid).set({
    id: userid,
    displayName: name,
    photoURL,
  });
};
