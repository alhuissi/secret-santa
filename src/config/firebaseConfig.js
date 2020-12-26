import firebase from "firebase";
import 'firebase/storage';

const config = {
  apiKey: "AIzaSyB7HFcmA27AGqOzF8qA9ctfDXjC8vP7Hh0",
  authDomain: "secret-santa-83260.firebaseapp.com",
  projectId: "secret-santa-83260",
  storageBucket: "secret-santa-83260.appspot.com",
  messagingSenderId: "441411543026",
  appId: "1:441411543026:web:b48abc9325cc5bb2c2156b"
};

firebase.initializeApp(config);
//firebase.analytics();

export async function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(
    async function(user) {
      if (user) {
        // console.log("User log in success", user);
        await func(true, user);
      } else {
        // console.log("User log in failed", user);
        await func(false);
      }
    },
    function(error) {
      console.log(error);
    }
  );
}

//export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const db = firebase.firestore();
export const firestorage = firebase.storage();
