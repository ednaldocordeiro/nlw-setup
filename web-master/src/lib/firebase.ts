import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBGY1LBh7Va9FrKj8Sx4nRbs3DnGHpebNQ",
  authDomain: "habits-nlw.firebaseapp.com",
  projectId: "habits-nlw",
  storageBucket: "habits-nlw.appspot.com",
  messagingSenderId: "574810934720",
  appId: "1:574810934720:web:c7af279eb25f87fdb34c25",
  measurementId: "G-SLRNCHERDL"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
