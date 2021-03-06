import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRVpOuym5kf_bxGRYcyGrIqO4p4HF8Yo0",
  authDomain: "think-piece-live-2ad94.firebaseapp.com",
  databaseURL: "https://think-piece-live-2ad94.firebaseio.com",
  projectId: "think-piece-live-2ad94",
  storageBucket: "think-piece-live-2ad94.appspot.com",
  messagingSenderId: "115709326966",
  appId: "1:115709326966:web:1dc483c4ae27eec3081157",
  measurementId: "G-SMDTQKKE38",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut().then(() => {});

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error.message);
    }
  }
  return getUserDocuemnt(user.uid);
};

export const getUserDocuemnt = async (uid) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error(error);
  }
};

export const updateDisplayNameCurrentUser = async (uid) => {
  const userRef = await getUserDocuemnt(uid);
  userRef.onSnapshot((snapshot) => {
    const displayName = snapshot.data().displayName;
    auth.currentUser.updateProfile({ displayName });
  });
};

export default firebase;
