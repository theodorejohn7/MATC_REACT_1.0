import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyBJpT0JxKY7SDhUi_dPBzvSv6qRbSs5gWc",
    authDomain: "final-form-233bc.firebaseapp.com",
    databaseURL: "https://final-form-233bc-default-rtdb.firebaseio.com",
    projectId: "final-form-233bc",
    storageBucket: "final-form-233bc.appspot.com",
    messagingSenderId: "198369737168",
    appId: "1:198369737168:web:0df31c217a1cb7294f61d5",
    measurementId: "G-B2GXD27S9E"
  };
  
 
  
firebase.initializeApp(firebaseConfig); 

var database = firebase.database();


 
export default database;

function initializeApp(firebaseConfig: { apiKey: string; authDomain: string; databaseURL: string; projectId: string; storageBucket: string; messagingSenderId: string; appId: string; measurementId: string; }) {
    throw new Error('Function not implemented.');
}