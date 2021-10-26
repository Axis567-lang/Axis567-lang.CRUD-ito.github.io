// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjNcpvWmzWyw0qlqmXwooKUlFQqIQwQw4",
  authDomain: "pcgn-web-crud.firebaseapp.com",
  projectId: "pcgn-web-crud",
  storageBucket: "pcgn-web-crud.appspot.com",
  messagingSenderId: "488776107079",
  appId: "1:488776107079:web:e81969b61191a8a2409d62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
