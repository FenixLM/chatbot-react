import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### FIREBASE PROJECT ID ###',
  storageBucket: '### FIREBASE STORAGE BUCKET ###',
  messagingSenderId: '### FIREBASE MESSAGING SENDER ID ###',
  appId: '### FIREBASE APP ID ###',
  measurementId: '### FIREBASE MEASUREMENT ID ###',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
