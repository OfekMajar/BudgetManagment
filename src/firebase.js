
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAUeuKww6LfxVsbOGA8MiWcKNOpPregdV0",
  authDomain: "budgetmanager-4b4a4.firebaseapp.com",
  projectId: "budgetmanager-4b4a4",
  storageBucket: "budgetmanager-4b4a4.appspot.com",
  messagingSenderId: "935184175880",
  appId: "1:935184175880:web:50986c0d0ff3b6609592bd"
};


const app = initializeApp(firebaseConfig);
export default getFirestore(app)