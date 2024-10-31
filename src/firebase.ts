import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCwA0O3Ki2-FW9r1_SohcXeg7UkObX3CuE',
  authDomain: 'chat-ia-vectores.firebaseapp.com',
  projectId: 'chat-ia-vectores',
  storageBucket: 'chat-ia-vectores.appspot.com',
  messagingSenderId: '789009233563',
  appId: '1:789009233563:web:fd4b7e603d6743a3d1f83e',
  measurementId: 'G-4XPS7XJYVW',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
