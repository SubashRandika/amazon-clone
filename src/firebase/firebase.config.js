import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyAdfhJlamTd5D8qwJVSnaHskZd3H4c9y78",
	authDomain: "clone-23a9e.firebaseapp.com",
	databaseURL: "https://clone-23a9e.firebaseio.com",
	projectId: "clone-23a9e",
	storageBucket: "clone-23a9e.appspot.com",
	messagingSenderId: "157850462043",
	appId: "1:157850462043:web:a5bc12c143336ad7861c7e",
	measurementId: "G-GTHTDVC8JH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
