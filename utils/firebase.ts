import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  DATABASE_URL,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from "@utils/secrets";

export const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

const createFirebaseApp = () => {
  try {
    return getApp();
  } catch {
    return initializeApp(firebaseConfig);
  }
};

const app = createFirebaseApp();
export const firebaseDb = getDatabase(app);
export const firebaseStore = getStorage(app);
export const auth = getAuth();
