import firebase from 'firebase';
import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnWUtdgoo6zwSBEYvzi9e8_4zF5XhLXIA",
  authDomain: "tds-bachao-8bc8a.firebaseapp.com",
  databaseURL: "https://tds-bachao-8bc8a-default-rtdb.firebaseio.com",
  projectId: "tds-bachao-8bc8a",
  storageBucket: "tds-bachao-8bc8a.appspot.com",
  messagingSenderId: "783182991042",
  appId: "1:783182991042:web:4d00dea4d7a1285445755b",
  measurementId: "G-15Y0G0WG5E"
};
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
export const auth = firebase.auth()

  export default firebase;