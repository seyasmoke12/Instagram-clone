
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app)
const storage = getStorage(app)

export {app,auth,firestore,storage}

//   apiKey: "AIzaSyBtx7LGWbSfwSZmaKIDm60bV31Dj_5o738",
  // authDomain: "fir-90c38.firebaseapp.com",
  // projectId: "fir-90c38",
  // storageBucket: "fir-90c38.appspot.com",
  // messagingSenderId: "200416828524",
  // appId: "1:200416828524:web:ec98338d383f920b62cc49"