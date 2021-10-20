import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore"

// Firebase config
const firebaseConfig = {
	apiKey: process.env.FBC_apiKey,
	authDomain: process.env.FBC_authDomain,
	projectId: process.env.FBC_projectId,
	storageBucket: process.env.FBC_storageBucket,
	messagingSenderId: process.env.FBC_messagingSenderId,
	appId: process.env.FBC_appId,
	measurementId: process.env.FBC_measurementId
}

// Initialize the firebase sdk
const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore(firebaseApp)