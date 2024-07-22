import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'hypertension-survey-7c2a5.firebaseapp.com',
  projectId: 'hypertension-survey-7c2a5',
  storageBucket: 'hypertension-survey-7c2a5.appspot.com',
  messagingSenderId: '37267446268',
  appId: '1:37267446268:web:76d5878bd8b01fc7997a79',
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
