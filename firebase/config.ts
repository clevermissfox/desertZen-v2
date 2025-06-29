// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_PkFPyI4XLcfPXroxip6_Jb5P2ykaYg",
  authDomain: "desert-zen.firebaseapp.com",
  projectId: "desert-zen",
  storageBucket: "desert-zen.firebasestorage.app",
  messagingSenderId: "46183478558",
  appId: "1:46183478558:web:cbdee23d1a3662e910c50f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence for better offline experience
import { enableNetwork, disableNetwork } from "firebase/firestore";

// Function to check if we're in development and handle connection gracefully
export const initializeFirebase = async () => {
  try {
    // Enable network to test connection
    await enableNetwork(db);
    console.log("Firebase connected successfully");
    return true;
  } catch (error) {
    console.warn("Firebase connection failed, operating in offline mode:", error);
    return false;
  }
};

// Export connection status checker
export const checkFirebaseConnection = async (): Promise<boolean> => {
  try {
    await enableNetwork(db);
    return true;
  } catch (error) {
    console.warn("Firebase offline:", error);
    return false;
  }
};