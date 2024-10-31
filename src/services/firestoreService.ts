import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';
import { MessageFirestore } from '../interfaces/Message.interface';

// Crear un documento
export const addDocument = async (
  collectionName: string,
  data: MessageFirestore
) => {
  const timestamp = serverTimestamp();
  data = { ...data, createdAt: timestamp };
  console.log(data);
  console.log(collectionName);

  return await addDoc(collection(db, collectionName), data);
};

// export const getDocuments = async (collectionName: string) => {
//   const snapshot = await getDocs(collection(db, collectionName));
//   return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
// };

// Actualizar documento
// export const updateDocument = async (
//   collectionName: string,
//   docId: string,
//   data: any
// ) => {
//   const docRef = doc(db, collectionName, docId);
//   return await updateDoc(docRef, data);
// };

// Eliminar documento
// export const deleteDocument = async (collectionName: string, docId: string) => {
//   const docRef = doc(db, collectionName, docId);
//   return await deleteDoc(docRef);
// };

export const getDocumentsByUser = async (
  collectionName: string,
  uid: string
): Promise<MessageFirestore[]> => {
  const q = query(
    collection(db, collectionName),
    where('uid', '==', uid),
    orderBy('createdAt', 'asc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as MessageFirestore),
  }));
};
