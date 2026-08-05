import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const configFiles = (import.meta as any).glob(['/firebase-applet-config.json', '../../firebase-applet-config.json'], { eager: true });
const configKey = Object.keys(configFiles)[0];

export const isFirebaseConfigured = !!configKey;

const firebaseConfig = configKey 
  ? (configFiles[configKey] as any).default || configFiles[configKey]
  : null;

const app = firebaseConfig ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : null as any;
export const auth = app ? getAuth(app) : null as any;
export const googleProvider = app ? new GoogleAuthProvider() : null as any;


