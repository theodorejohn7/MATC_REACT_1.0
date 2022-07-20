import firebase from "firebase";

const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;
const FIREBASE_APIKEY = process.env.REACT_APP_FIREBASE_APIKEY;
const FIREBASE_AUTHDOMAIN = process.env.REACT_APP_FIREBASE_AUTHDOMAIN;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APPID = process.env.REACT_APP_FIREBASE_APPID;
const FIREBASE_MEASUREMENT_ID = process.env.REACT_APP_FIREBASE_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTHDOMAIN,
  databaseURL: FIREBASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APPID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();

export default database;
 
