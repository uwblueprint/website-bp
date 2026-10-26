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

// Placeholders keep Firebase initialization (`getAuth`/`getDatabase`) from
// throwing at import time during `next build` when these env vars are absent —
// e.g. CI runs on fork PRs, which GitHub does not expose repository secrets to,
// so the build would otherwise crash while collecting page data. Real
// deployments build with the real values injected, so the fallbacks are unused
// there.
export const firebaseConfig = {
  apiKey: API_KEY || "placeholder-api-key",
  authDomain: AUTH_DOMAIN,
  databaseURL:
    DATABASE_URL || "https://uw-blueprint-placeholder.firebaseio.com",
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
