import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvNabL_szauU39iWD6woLRG9gqTuLSWYY",
  authDomain: "seamaf-ilubooks.firebaseapp.com",
  projectId: "seamaf-ilubooks",
  storageBucket: "seamaf-ilubooks.appspot.com",
  messagingSenderId: "339390391457",
  appId: "1:339390391457:web:0e516659f4453d09b8fce0",
  measurementId: "G-QDZKTR9FJJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { app, auth, provider, analytics };
