import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbIuueSD9KHBakxq1NOgVMMgzySwRcEUY",
  authDomain: "react-chatapp-f4c05.firebaseapp.com",
  projectId: "react-chatapp-f4c05",
  storageBucket: "react-chatapp-f4c05.appspot.com",
  messagingSenderId: "157801542802",
  appId: "1:157801542802:web:edcb205a9f91d4e8aee24b",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
