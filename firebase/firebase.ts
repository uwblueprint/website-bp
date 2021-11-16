import { initializeApp, getApp, getApps } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_REACT_APP_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_APP_ID,
};

let firebaseConnection;
if (!getApps().length) {
    console.log("initializing");
    firebaseConnection = initializeApp(firebaseConfig);
} else {
    firebaseConnection = getApp();
}
export default firebaseConnection;
