
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDg6tkQDmcHpn9ZtsDklWBAR8FdDh6pCuE",
  authDomain: "busy-buy-17810.firebaseapp.com",
  projectId: "busy-buy-17810",
  storageBucket: "busy-buy-17810.firebasestorage.app",
  messagingSenderId: "1016052363790",
  appId: "1:1016052363790:web:40c9ee8dccc37c38b5425f"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;