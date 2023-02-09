import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvcUt6KSeJL47uMKOEftZD9aWfn243bwU",
  authDomain: "chat-app-2bb67.firebaseapp.com",
  projectId: "chat-app-2bb67",
  storageBucket: "chat-app-2bb67.appspot.com",
  messagingSenderId: "433208140586",
  appId: "1:433208140586:web:bdccae24b647e4c109f453",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
