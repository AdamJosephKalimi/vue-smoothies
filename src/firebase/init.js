import firebase from 'firebase'
import firestore from 'firebase/firestore' 

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyB8-9dUI1x64Ln58nOPUwum-lTRu0dj-es",
    authDomain: "ninja-smoothies-f3de4.firebaseapp.com",
    databaseURL: "https://ninja-smoothies-f3de4.firebaseio.com",
    projectId: "ninja-smoothies-f3de4",
    storageBucket: "ninja-smoothies-f3de4.appspot.com",
    messagingSenderId: "1039599855203",
    appId: "1:1039599855203:web:5c68ba9fc4c97288783a56",
    measurementId: "G-0EJ6B3F603"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
//   firebaseApp.firestore().settings({ timestampsInSnapshots: true })
  firebase.analytics();

  // Export firestore database
  export default firebaseApp.firestore()