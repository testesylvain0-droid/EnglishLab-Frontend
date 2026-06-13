import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration with actual credentials
const firebaseConfig = {
  apiKey: "AIzaSyCYKofSYVVmPLqh2o5_yFy_XQ2ZbBtOO3c",
  authDomain: "vaovao-c1215.firebaseapp.com",
  projectId: "vaovao-c1215",
  storageBucket: "vaovao-c1215.firebasestorage.app",
  messagingSenderId: "854816769200",
  appId: "1:854816769200:web:bea2ca6042aaa3d78ae775",
  measurementId: "G-7BMFBZ2LC4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { analytics };
export default app;
