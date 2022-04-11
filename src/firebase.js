import firebase from "firebase";

var firebaseConfig = firebase.initializeApp({
	apiKey: "AIzaSyDKdvu28azwbAsLMav9ySnP_mCsw7yJvms",
	authDomain: "picstagram-6b5e3.firebaseapp.com",
	projectId: "picstagram-6b5e3",
	storageBucket: "picstagram-6b5e3.appspot.com",
	messagingSenderId: "306936331992",
	appId: "1:306936331992:web:39a94489939f4af2b261ad"
});


const db = firebaseConfig.firestore();
const auth = firebaseConfig.auth();
const storage = firebaseConfig.storage();

export {db, auth, storage};
