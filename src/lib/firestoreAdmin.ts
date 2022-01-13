import admin from 'firebase-admin';
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
        createdAt: (new Date(d.createdAt.seconds*1000)).toISOString(),
      },
    });
  });
  return items;
};

export const getWorkCollection = (userid: string) => userCollection.doc(userid).collection('work');

export const getWorkList = async (userid: string, maxWorkCount?: number) => {
  const workDatabase = await (maxWorkCount
    ? getWorkCollection(userid).limit(maxWorkCount).orderBy('createdAt', 'desc').get()
    : getWorkCollection(userid).orderBy('createdAt', 'desc').get());
  return snapshotToList(workDatabase, userid);
};

export const updateWork = (userid: string, id: string, workDetail: WorkDetail) =>
  getWorkCollection(userid).doc(id).set(workDetail);

export const addWork = (userid: string, workDetail: WorkDetail) =>
  getWorkCollection(userid).add({...workDetail, createdAt: admin.firestore.FieldValue.serverTimestamp()});

export const getUser = async (userid: string): Promise<User | null> => {
  const userSnap = await userCollection.doc(userid).get();
  if (!userSnap.exists) return null;
  return userSnap.data() as User;
};

export const setUser = async (userid: string, user: User) => {
  userCollection.doc(userid).set({
    id: userid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};
