import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArnlEndtLiFU79qgY894RZaf6blslmgzI",
  authDomain: "covid-19-datnq.firebaseapp.com",
  databaseURL: "https://covid-19-datnq.firebaseio.com",
  projectId: "covid-19-datnq",
  storageBucket: "covid-19-datnq.appspot.com",
  messagingSenderId: "1089171495765",
  appId: "1:1089171495765:web:d1825747cb91e3e9e0addc",
  measurementId: "G-6F7Q7BPE8M"
};

firebase.initializeApp(firebaseConfig);

export default firebase;