import firebase from "firebase/app";
import 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyA6i2VgGUBA8_WpS4M9FrWaF6xZPLUMFiQ",
    authDomain: "garment-c60df.firebaseapp.com",
    projectId: "garment-c60df",
    storageBucket: "garment-c60df.firebasestorage.app",
    messagingSenderId: "674081841232",
    appId: "1:674081841232:web:f2af6da7263acf51007155"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase