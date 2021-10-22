import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Firebase config
const firebaseConfig = {
	databaseURL: process.env.FBC_dbUrl,
	apiKey: process.env.FBC_apiKey,
	authDomain: process.env.FBC_authDomain,
	projectId: process.env.FBC_projectId,
	storageBucket: process.env.FBC_storageBucket,
	messagingSenderId: process.env.FBC_messagingSenderId,
	appId: process.env.FBC_appId,
	measurementId: process.env.FBC_measurementId
}

// Initialize the firebase sdk
export const firebaseApp = initializeApp(firebaseConfig)
export const auth = getAuth()
// Initializing the firestore to turn off the fetchstreams option as this improves the file upload
// Fixed thanks to: https://github.com/firebase/firebase-js-sdk/issues/1674#issuecomment-944041831
export const db = initializeFirestore(firebaseApp, {
	useFetchStreams: false,
} as any)

export const firebaseStorage = getStorage()