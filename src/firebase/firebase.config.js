import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "<YOUR_FIREBASE_API_KEY_HERE>",
	authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN_HERE>",
	databaseURL: "<YOUR_FIREBASE_DB_URL_HERE>",
	projectId: "clone-23a9e",
	storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET_HERE>",
	messagingSenderId: "157850462043",
	appId: "1:157850462043:web:a5bc12c143336ad7861c7e",
	measurementId: "G-GTHTDVC8JH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
