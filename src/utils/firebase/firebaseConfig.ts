// firebase/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoQ9qraLBwU3oPG2F-BspXdg56KowcDo4",
  authDomain: "arennah-234db.firebaseapp.com",
  projectId: "arennah-234db",
  storageBucket: "arennah-234db.appspot.com",
  messagingSenderId: "1080949035782",
  appId: "1:1080949035782:web:19d6fb73624727e8340487",
};




const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence);

export { auth };

export async function handleGoogleSignIn(idToken: string) {
  const credential = GoogleAuthProvider.credential(idToken);
  return await signInWithCredential(auth, credential);
}
