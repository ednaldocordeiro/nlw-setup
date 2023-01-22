import firebase from 'firebase/auth';
import firebaseui from "firebaseui";

const ui = new firebaseui.auth.AuthUI(firebase)

ui.start('#firebase-auth-container', {
  signInOptions: [
    firebase.EmailAuthProvider.PROVIDER_ID
  ],
});
